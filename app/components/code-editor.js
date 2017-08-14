/* global ace */
/* global purecloud */
/* global $ */
import architect from 'npm:architect-scripting';
import Ember from 'ember';
import sampleCode from '../utils/sample-code';

var computed = Ember.computed;

let classTypeRegex = /new\s*$/;

window.architect = architect;

export default Ember.Component.extend({
  storageService: Ember.inject.service(),
  githubService: Ember.inject.service(),
  analyticsService: Ember.inject.service(),
  purecloud: Ember.inject.service('purecloud'),
  messages: [],
  code: '',
  codeSamples: function () {
    let filteredSampleCode = [];
    Object.keys(sampleCode[this.get('selectedApi').value]).forEach(function(key) {
      if (!sampleCode[this.get('selectedApi').value][key].hideInDropDown) {
        filteredSampleCode.push({name:sampleCode[this.get('selectedApi').value][key].name, value: key});
      }
    }.bind(this));
    return filteredSampleCode;
  }.property('selectedApi'),
  enableDebugging: false,
  apiTypes: [ {displayName: 'PureCloud SDK', value: 'pureCloudSdk'}],
  selectedSdk: null,
  selectedApi: {displayName: 'PureCloud SDK', value: 'pureCloudSdk'},
  isPurecloudSdk: function () {
    return this.get('selectedApi').value === 'pureCloudSdk';
  }.property('selectedApi'),
  isArchitectSdk: function () {
    return this.get('selectedApi').value === 'architectSdk';
  }.property('selectedApi'),
  url: computed('enableDebugging', 'selectedSdk', function () {
    let purecloud = this.get("purecloud").get("session");
    let selectedSdk = this.get("selectedSdk");
    let url = `coderunner/index.html?auth=${purecloud.options.token}&environment=${purecloud.options.environment}&sdk=${selectedSdk}`;
    return url;
  }),
  sdkTags: computed('githubService.jsSdkReleases', function () {
    let releases = this.get("githubService").get("jsSdkReleases");
    this.set('selectedSdk', releases[0]);
    return this.get("githubService").get("jsSdkReleases");
  }),
  runToggle: false,
  aceConsoleInit: function (editor) {
    editor.setHighlightActiveLine(false);
    editor.$blockScrolling = Infinity;
    editor.setShowPrintMargin(false);
    editor.setReadOnly(true);
    editor.getSession().setMode("ace/mode/json");
  },
  aceInit: function (editor) {
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    editor.$blockScrolling = Infinity;
    editor.getSession().setTabSize(2);
    editor.getSession().setMode("ace/mode/javascript");
    editor.setOptions({enableBasicAutocompletion: true});

    let langTools = ace.require("ace/ext/language_tools");

    let methodCompleter = {
      getCompletions: function (editor, session, pos, prefix, callback) {

        let code = editor.getSession().getValue();

        let codeArray = code.split("\n");
        let currentRow = codeArray[pos.row];

        let trimRow = currentRow.substring(0, pos.column);

        let variableNameRegex = new RegExp('(\\S+).' + prefix + '$');
        let methodMatch = trimRow.match(variableNameRegex);
        if (trimRow.match(classTypeRegex)) {
          let pureCloudClasses = [];

          for (var m in window) {
            if (m.indexOf("Api") > 0 && typeof(window[m]) === "function") {
              pureCloudClasses.push({
                word: m,
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
        else if (methodMatch) {

          let variableName = methodMatch[1];

          let regex = new RegExp(variableName + '\\s*=\\s*new\\s*(\\w*Api)');
          let type = code.match(regex);
          if (type) {
            let apiType = type[1];

            let session = purecloud.platform.PureCloudSession();
            let instance = new window[apiType](session);

            let functions = [];
            for (var i in instance) {
              if (typeof instance[i] === "function") {
                if (prefix === "" || i.indexOf(prefix) === 0) {
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
  _receivePostMessage(event) {
    try {
      if (event.origin !== "null" && event.origin !== window.location.origin) {
        return;
      }

      if (typeof(event.data) === 'object') {
        return;
      }
      let data = JSON.parse(event.data);

      if (data.action === 'console') {
        let array = [];

        for (let key in data.arguments) {
          let o = data.arguments[key];
          let isObject = false;
          if (typeof(o) === "object") {
            o = JSON.stringify(o, null, "  ");
            isObject = true;
          }
          array.push({value: o, isObject: isObject});
        }

        let message = {
          type: data.type,
          messageParams: array
        };

        this.messages.pushObject(message);
      }
      else if (data.action === "runerror") {
        let isObject = false;
        if (typeof(data.message) === "object") {
          data.message = JSON.stringify(data.message, null, "  ");
          isObject = true;
        }

        this.messages.pushObject({
          type: "critical",
          messageParams: [{value: data.name + " " + data.message, isObject: isObject}],
          lineNumber: data.lineNumber
        });
      }
    } catch (ex) {
      console.error(ex);
    }

  },
  init() {
    this._super(...arguments);

    this.get("enableDebugging");

    this.addObserver('runToggle', function () {
      this.messages.clear();
      var iframeBody = document.getElementById('code-runner').contentWindow;
      iframeBody.postMessage(JSON.stringify({
        action: 'javascript',
        data: this.get('code')
      }), '*');
    });

    let defaultCode = '';

    let storage = this.get("storageService");
    if (storage.localStorageGet('archDevToolsScripting') && !this.get('apiTypes')[1] || this.get('apiTypes')[1].value !=='architectSdk' ) {
      this.get('apiTypes').push({displayName: 'Architect SDK', value: 'architectSdk'});
    }
    let code = storage.localStorageGet("code");

    if (code === null || typeof(code) === "undefined" || code.length === 0) {
      code = defaultCode;
    }

    this.set("code", code);

  },
  _architectLoggingCallback(logInfo) {
    var messageType;
    switch  ( logInfo.logType) {
      case architect.enums.archEnums.LOG_TYPES.info:
        messageType = 'log';
        break;
      case architect.enums.archEnums.LOG_TYPES.warning:
        messageType = 'error';
        break;
      case architect.enums.archEnums.LOG_TYPES.error:
        messageType = 'critical';
        break;
      default:
        messageType = 'log';
    }
    this.messages.pushObject({
      type: messageType,
      messageParams: [{header: logInfo.messageParts.header, body: logInfo.messageParts.message, isObject: false}],
      lineNumber: undefined
    });
  },
  didInsertElement() {
    //from: http://discuss.emberjs.com/t/solved-how-to-remove-event-handler-properly-in-a-component/8931
    if (typeof this._onWindowMessage === "undefined" || this._onWindowMessage == null) {
      this._onWindowMessage = this._receivePostMessage.bind(this);
      window.addEventListener('message', this._onWindowMessage, false);
    }

  },

  willDestroyElement() {
    if (this._onWindowMessage) {
      window.removeEventListener('message', this._onWindowMessage, false);
      this._onWindowMessage = null;
    }

  },
  actions: {
    selectSdk(sdk) {
      this.set('selectedSdk', sdk);
    },
    selectApi(api) {
      this.set('selectedApi', api);
    },
    loadSample(value) {
      let code;
      code = sampleCode[this.get('selectedApi').value][value].code;
      let editor = window.ace.edit('ace-code-editor');
      editor.getSession().setValue(code);
      this.set("code", code);
    },

    run() {
      // need to expose architect as a window command so ace can nab it.
      this.get("analyticsService").logCodeExecution();

      this.messages.clear();
      var iframeBody = document.getElementById('code-runner').contentWindow;
      let code = this.get("code");

      let storage = this.get("storageService");
      storage.localStorageSet("code", code);

      var token = 'var token ="' + this.get('purecloud').get("session").options.token + '";';

      if (this.get('isPurecloudSdk')) {
        iframeBody.window.purecloud = purecloud;
        // Append different setup code for which sdk we are currently using
        code = token + 'var pureCloudSession = purecloud.platform.PureCloudSession({strategy: "token",token: token, environment: "inindca.com"});' + code;
      } else if (this.get('isArchitectSdk')) {
        iframeBody.window.architect = architect;
        iframeBody.window.architect.services.archLogging.setLoggingCallback(this._architectLoggingCallback.bind(this));
        code = token + 'var archScripting = window.architect;' + code;
      }

      iframeBody.postMessage(JSON.stringify({
        action: 'javascript',
        data: code
      }), '*');

      $('li, .tab-pane').removeClass('active');
      $("#console-tab, #console").addClass('active');
    }
  }
});
