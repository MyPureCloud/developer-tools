import Ember from 'ember';

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

        return "https://apps.inindca.com/openapi-explorer/"+ search +"#token_type=bearer&access_token=" + this.get("purecloud").get("session").authToken();

    }
});
