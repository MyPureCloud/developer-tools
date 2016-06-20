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
        jsElm.src = "https://sdk-cdn.mypurecloud.com/javascript/"+ sdk +"/purecloud-api.js";
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

            Array.prototype.unshift.call(arguments, 'Code Execution: ');
            oldError.apply(this, arguments);
        }

        console.warn = function(){
            sendConsoleMessage("warn", arguments);
            Array.prototype.unshift.call(arguments, 'Code Execution: ');
            oldWarn.apply(this, arguments);
            sendConsoleMessage("error", arguments);

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

                data = 'var pureCloudSession = new PureCloudSession("' + environment+ '"); pureCloudSession.debug("' + debug+ '"); pureCloudSession.authToken("' + authToken + '");' + data

                var result = eval(data);
                console.log(result);
            }
            catch (e) {
                var lineNumber = e.lineNumber - 30 + 1 || (e.stack.match(ANONOMOUS_REGEX) || [,])[1];

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
