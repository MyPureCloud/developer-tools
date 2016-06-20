
var domLoaded = false;

function handleError(e) {
    console.error(e.message + ' Line: ' + e.lineno + " Column: " + e.colno);
}

window.addEventListener("error", handleError, true);

document.addEventListener('DOMContentLoaded', function() {

    var sdk = getQueryVariable('sdk');

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

(function(){
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
})();

function sendConsoleMessage(type, args){

    parent.postMessage(JSON.stringify({
        action: 'console',
        type: type,
        arguments: args

    }), '*');
}

var ANONOMOUS_REGEX = /<anonymous>:(\d+):\d+/;

onmessage = function(evt) {
    if ( evt.origin === window.location.origin) {
		var info = JSON.parse(evt.data);
	    var data = info.data;

        try {
            document.body.innerHTML = document.body.innerHTML;
            var environment = getQueryVariable('environment');
            var debug = (getQueryVariable('debug') === 'true');
            var authToken = getQueryVariable('auth');

            data = 'var pureCloudSession = new PureCloudSession("' + environment+ '"); pureCloudSession.debug("' + debug+ '"); pureCloudSession.authToken("' + authToken + '");' + data

            eval(data);
        }
        catch (e) {
            var lineNumber = e.lineNumber - 30 + 1 || (e.stack.match(ANONOMOUS_REGEX) || [,])[1];

            parent.postMessage(JSON.stringify({
                action: 'runerror',
                type: 'error',
                name: e.name,
                message: e.message,
                lineNumber: lineNumber
            }), '*');
        }
	}
};
