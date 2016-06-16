import Ember from 'ember';
const ENV_REG_EXP = /(inin[dts]ca|mypurecloud|localhost)/i;

export default Ember.Route.extend({
    purecloud: Ember.inject.service(),
    model(){
        //return {
        //    iframeUrl: "http://mypurecloud.github.io/openapi-explorer/"
    //    }
        console.log("opening api explorer to " + window.location.search);

        let search = window.location.search;

        if(window.location.hash.indexOf("share")>0){
            search = "?" + window.location.hash.substring(window.location.hash.indexOf("share"));
        }

        let env = ENV_REG_EXP.exec(window.location.hostname)[0];
        let purecloudEnvironment = env + ".com";

        if(env === 'localhost'){
            purecloudEnvironment = "inindca.com";
        }

        let swagger = `openApiUrl=https://api.${purecloudEnvironment}/api/v2/docs/swagger`;
        if(search == null || search.length === 0){
            search = "?"+swagger;
        }else{
            search += "&" + swagger;
        }

        return `https://apps.${purecloudEnvironment}/openapi-explorer/${search}#token_type=bearer&access_token=` + this.get("purecloud").get("session").authToken();

    }
});
