import Ember from 'ember';
const ENV_REG_EXP = /(inin[dts]ca|mypurecloud|localhost)/i;

export default Ember.Route.extend({
    purecloud: Ember.inject.service(),
    analyticsService: Ember.inject.service(),

    init(){
        let that = this;
        function receiveMessage(event)
        {
            if (event.origin !== "null" && event.origin !== window.location.origin) {
                //return;
            }

            if(typeof(event.data) === 'object'){
                return;
            }
            let data = JSON.parse(event.data);

            if(data.action === 'anaytics'){
                that.get("analyticsService").logExporerExecution(data.httpMethod, data.url);
            }

        }
        window.addEventListener("message", receiveMessage, false);
    },

    model(){

        let search = window.location.search;

        if(window.location.hash.indexOf("share")>0){
            search = "?" + window.location.hash.substring(window.location.hash.indexOf("share"));
        }

        let env = ENV_REG_EXP.exec(window.location.hostname)[0];
        let purecloudEnvironment = env + ".com";

        if(env === 'localhost'){
            purecloudEnvironment = "inindca.com";
        }

        let swagger = `openApiUrl=https://api.${purecloudEnvironment}/api/v2/docs/swagger&shareUrl=${window.location.origin}` + encodeURIComponent('/developer-tools/#/api-explorer?');
        if(search == null || search.length === 0){
            search = "?"+swagger;
        }else{
            search += "&" + swagger;
        }

        return `https://apps.${purecloudEnvironment}/openapi-explorer/${search}#token_type=bearer&access_token=` + this.get("purecloud").get("session").options.token;

    }
});
