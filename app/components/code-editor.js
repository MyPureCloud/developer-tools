import Ember from 'ember';
var  computed = Ember.computed;

let classTypeRegex = /new\s*$/;

export default Ember.Component.extend({
    storageService: Ember.inject.service(),
    purecloud: Ember.inject.service('purecloud'),
    messages:[{
        type: "log",
        messageParams: [{value:"No log message"}]
    }],
    code: '',
    enableDebugging: false,
    url: computed('enableDebugging', function() {
        let purecloud = this.get("purecloud").get("session");
        let url = `/coderunner/index.html?auth=${purecloud.authToken()}&debug=${this.get("enableDebugging")}&environment=${purecloud.environment()}`;
        return url;
    }),
    runToggle: false,
    aceInit: function(editor) {
        let that = this;
        editor.setHighlightActiveLine(false);
        editor.setShowPrintMargin(false);
        editor.getSession().setTabSize(2);
        editor.getSession().setMode("ace/mode/javascript");
        editor.setOptions({enableBasicAutocompletion: true});

        let langTools = ace.require("ace/ext/language_tools");

        let methodCompleter = {
            getCompletions: function(editor, session, pos, prefix, callback) {

                let code = editor.getSession().getValue();

                let codeArray = code.split("\n");
                let currentRow = codeArray[pos.row];

                let trimRow = currentRow.substring(0, pos.column);

                let variableNameRegex = new RegExp('(\\S+).'+ prefix +'$');
                let methodMatch = trimRow.match(variableNameRegex);
                if(trimRow.match(classTypeRegex)){
                    let pureCloudClasses = [];

                    for(var m in window) {
                        if(m.indexOf("Api") > 0 && typeof(window[m]) == "function") {
                            pureCloudClasses.push({
                                word: m ,
                                value: m+ "(pureCloudSession);",
                                score: 100,
                                meta: "PureCloud Class"

                            });
                        }
                    }

                    pureCloudClasses = pureCloudClasses.sort(function compare(a, b) {
                      return a.value.localeCompare(b.value);
                    })
                    callback(null, pureCloudClasses);
                }
                else if(methodMatch){

                    let variableName = methodMatch[1];

                    let regex = new RegExp( variableName + '\\s*=\\s*new\\s*(\\w*Api)');
                    let type = code.match(regex);
                    if(type){
                        let apiType = type[1];

                        let session = new PureCloudSession();
                        let instance = new window[apiType](session);

                        let functions = [];
                        for(var m in instance) {
                            if(typeof instance[m] == "function") {
                                if(prefix === "" || m.indexOf(prefix) === 0){
                                    functions.push({
                                        word: m,
                                        value: m,
                                        score: 100,
                                        meta: apiType + " Function"

                                    });
                                }

                            }
                        }
                        functions.sort(function compare(a, b) {
                          return a.word.localeCompare(b.word);
                        })
                        callback(null, functions);
                    }
                }
            }
        }
        langTools.addCompleter(methodCompleter);
    },
    init(){
        this._super(...arguments);

        this.get("enableDebugging");
        let that= this;

        this.addObserver('runToggle', function() {
            this.messages.clear();
            var iframeBody = document.getElementById('code-runner').contentWindow
            iframeBody.postMessage(JSON.stringify({
                action: 'javascript',
                data: this.get('code')
            }), '*');
        });

        let defaultCode = `//log out your current environment
console.log(pureCloudSession.environment());

//use that session to interface with the API
var users = new UsersApi(pureCloudSession);

console.log("getting ME");
users.getMe().done(function(userObject){
    console.log("got me");
    console.log(userObject);
    console.log("done");
});`;

        let storage = this.get("storageService");
        let code = storage.localStorageGet("code");

        if(code == null || code.length ==0){
            code = defaultCode;
        }

        this.set("code", code);

        function receiveMessage(event)
        {
            if ( event.origin !== window.location.origin) {
                return;
            }

            if(typeof(event.data) === 'object'){
                return;
            }
            let data = JSON.parse(event.data);

            if(data.action === 'console'){
                let array = [];

                for(let key in data.arguments){
                    let o = data.arguments[key];
                    let isObject = false;
                    if(typeof(o) === "object"){
                        o= JSON.stringify(o, null, "  ");
                        isObject= true;
                    }
                    array.push({value:o, isObject:isObject});
                }

                let message = {
                    type: data.type,
                    messageParams: array
                };

                that.messages.pushObject(message);
            }
            else if (data.action === "runerror"){
                that.messages.pushObject({
                    type: "critical",
                    message: data.message,
                    name: data.name,
                    lineNumber: data.lineNumber
                })
            }

        }
        window.addEventListener("message", receiveMessage, false);
    },
    actions:{
        run(){
            this.messages.clear();
            var iframeBody = document.getElementById('code-runner').contentWindow;
            let code = this.get("code");

            let storage = this.get("storageService");
            storage.localStorageSet("code", code);

            iframeBody.postMessage(JSON.stringify({
                action: 'javascript',
                data: code
            }), '*');
        }
    }
});
