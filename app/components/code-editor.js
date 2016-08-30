/* global ace */
/* global purecloud */
import Ember from 'ember';
import sampleCode from '../utils/sample-code';

var  computed = Ember.computed;

let classTypeRegex = /new\s*$/;

export default Ember.Component.extend({
    storageService: Ember.inject.service(),
    githubService: Ember.inject.service(),
    analyticsService: Ember.inject.service(),
    purecloud: Ember.inject.service('purecloud'),
    messages:[],
    code: '',
    codeSamples: sampleCode,
    enableDebugging: false,
    selectedSdk: null,
    url: computed('enableDebugging', 'selectedSdk', function() {
        let purecloud = this.get("purecloud").get("session");
        let selectedSdk = this.get("selectedSdk");
        let url = `coderunner/index.html?auth=${purecloud.options.token}&environment=${purecloud.options.environment}&sdk=${selectedSdk}`;
        return url;
    }),
    sdkTags: computed('githubService.jsSdkReleases', function() {
        let releases = this.get("githubService").get("jsSdkReleases");
        this.set('selectedSdk', releases[0]);
        return this.get("githubService").get("jsSdkReleases");
    }),
    runToggle: false,
    aceConsoleInit: function(editor){
        editor.setHighlightActiveLine(false);
        editor.$blockScrolling = Infinity;
        editor.setShowPrintMargin(false);
        editor.setReadOnly(true);
        editor.getSession().setMode("ace/mode/json");
    },
    aceInit: function(editor) {
        editor.setHighlightActiveLine(false);
        editor.setShowPrintMargin(false);
        editor.$blockScrolling = Infinity;
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
                        if(m.indexOf("Api") > 0 && typeof(window[m]) === "function") {
                            pureCloudClasses.push({
                                word: m ,
                                value: m + "(pureCloudSession);",
                                score: 100,
                                meta: "PureCloud Class"

                            });
                        }
                    }

                    pureCloudClasses = pureCloudClasses.sort(function compare(a, b) {
                        return a.value.localeCompare(b.value);
                    });
                    callback(null, pureCloudClasses);
                }
                else if(methodMatch){

                    let variableName = methodMatch[1];

                    let regex = new RegExp( variableName + '\\s*=\\s*new\\s*(\\w*Api)');
                    let type = code.match(regex);
                    if(type){
                        let apiType = type[1];

                        let session = purecloud.platform.PureCloudSession();
                        let instance = new window[apiType](session);

                        let functions = [];
                        for(var i in instance) {
                            if(typeof instance[i] === "function") {
                                if(prefix === "" || i.indexOf(prefix) === 0){
                                    functions.push({
                                        word: i,
                                        value: i,
                                        score: 100,
                                        meta: apiType + " Function"

                                    });
                                }

                            }
                        }
                        functions.sort(function compare(a, b) {
                            return a.word.localeCompare(b.word);
                        });
                        callback(null, functions);
                    }
                }
            }
        };
        langTools.addCompleter(methodCompleter);
    },
    _receivePostMessage(event){
        if (event.origin !== "null" && event.origin !== window.location.origin) {
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

            this.messages.pushObject(message);
        }
        else if (data.action === "runerror"){
            let isObject = false;
            if(typeof(data.message) === "object"){
                data.message= JSON.stringify(data.message, null, "  ");
                isObject= true;
            }

            this.messages.pushObject({
                type: "critical",
                messageParams: [{value: data.name + " " + data.message, isObject: isObject}],
                lineNumber: data.lineNumber
            });
        }
    },
    init(){
        this._super(...arguments);

        this.get("enableDebugging");
        
        this.addObserver('runToggle', function() {
            this.messages.clear();
            var iframeBody = document.getElementById('code-runner').contentWindow;
            iframeBody.postMessage(JSON.stringify({
                action: 'javascript',
                data: this.get('code')
            }), '*');
        });

        let defaultCode = sampleCode[0].code;

        let storage = this.get("storageService");
        let code = storage.localStorageGet("code");

        if(code === null || typeof(code) === "undefined" || code.length === 0){
            code = defaultCode;
        }

        this.set("code", code);

    },
    didInsertElement() {
        //from: http://discuss.emberjs.com/t/solved-how-to-remove-event-handler-properly-in-a-component/8931
        if(typeof this._onWindowMessage === "undefined" || this._onWindowMessage == null){
            this._onWindowMessage = this._receivePostMessage.bind(this);
            window.addEventListener('message', this._onWindowMessage, false);
        }

    },

    willDestroyElement() {
        if(this._onWindowMessage){
            window.removeEventListener('message', this._onWindowMessage, false);
            this._onWindowMessage = null;
        }

    },
    actions:{
        selectSdk(sdk) {
            this.set('selectedSdk', sdk);
        },
        loadSample(index){
            let code = sampleCode[index].code;
            this.set("code", code);

            let editor = window.ace.edit('ace-code-editor');
            editor.getSession().setValue(code);

        },
        run(){
            this.get("analyticsService").logCodeExecution();

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
