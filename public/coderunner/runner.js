(function(){
    var domLoaded = false;
    var parentWindow = null;
    var origin = null;

    function handleError(e) {
        console.error(e.message + ' Line: ' + e.lineno + " Column: " + e.colno);
    }

    window.addEventListener("error", handleError, true);

    document.addEventListener('DOMContentLoaded', function() {

        var sdk = getQueryVariable('sdk');

        if(sdk === null || sdk === "undefined"){
            //don't load url if sdk is undefined
            return;
        }

        domLoaded = true;

        //load PureCloud API
        var jsElm = document.createElement("script");
        jsElm.type = "application/javascript";
        jsElm.src = "https://sdk-cdn.mypurecloud.com/javascript/"+ sdk +"/"+ "purecloud-platform-client-v2.min.js";
        document.body.appendChild(jsElm);

    });

    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }


    if(window.console && console.log){
        var oldLog = console.log;
        var oldError = console.error;
        var oldWarn = console.warn;
        console.log = function(){
            sendConsoleMessage("log", arguments);

            Array.prototype.unshift.call(arguments, 'Code Execution: ');
            oldLog.apply(this, arguments);
        }

        console.error = function(){
            sendConsoleMessage("error", arguments);

            Array.prototype.unshift.call(arguments, 'Code Execution: ');
            oldError.apply(this, arguments);
        }

        console.warn = function(){
            sendConsoleMessage("warn", arguments);
            Array.prototype.unshift.call(arguments, 'Code Execution: ');
            oldWarn.apply(this, arguments);
        }
    }


    function sendConsoleMessage(type, args){

        parentWindow.postMessage(JSON.stringify({
            action: 'console',
            type: type,
            arguments: args

        }), origin);
    }

    var ANONOMOUS_REGEX = /<anonymous>:(\d+):\d+/;
    var PARENT_REGEX = /[^\w]parent/gm;
    var PARENT_IN_COMMENT_REGEX = /\/\/.*[^\w]*parent/g;
    var LINE_OFFSET = 29;

    window.addEventListener('message', function(evt) {

        if ( evt.origin === window.location.origin) {
            parentWindow = evt.source;
            origin = evt.origin;
            var info = JSON.parse(evt.data);
            var data = info.data;

            try {
                document.body.innerHTML = document.body.innerHTML;
                var environment = getQueryVariable('environment');
                var debug = (getQueryVariable('debug') === 'true');
                var authToken = getQueryVariable('auth');

                //platform api requires us to allow-same-origin on the iframe, so we'll do some additional checks
                //here to try and prevent parent access.  Not perfect, but better than nothing
                var parentAccess = data.match(PARENT_REGEX);
                if(parentAccess){

                    var lines = data.split('\n');

                    for(var l=0; l<lines.length; l++){
                        if(lines[l].match(PARENT_REGEX) && !lines[l].match(PARENT_IN_COMMENT_REGEX)){
                            throw {
                                lineNumber: LINE_OFFSET + l + 1,
                                name: "Parent Frame access",
                                stack: "",
                                message: "Can not execute script, it looks like you might be trying to access the parent window"
                            }
                        }
                    }
                }

                //data = 'var pureCloudSession = purecloud.platform.PureCloudSession({strategy: "token",token: "' + authToken+ '", environment: "' + environment+ '"});' + data
                data = "var platformClient = require('platformClient'); platformClient.ApiClient.instance.setAccessToken('"+ authToken +"'); platformClient.ApiClient.instance.setEnvironment('"+environment+"');"  + data;
                eval(data);
            }
            catch (e) {
                var lineNumber = e.lineNumber - LINE_OFFSET || (e.stack.match(ANONOMOUS_REGEX) || [,])[1];

                parentWindow.postMessage(JSON.stringify({
                    action: 'runerror',
                    type: 'error',
                    name: e.name,
                    message: e.message,
                    lineNumber: lineNumber
                }), origin);
            }
        }
    });
})();
