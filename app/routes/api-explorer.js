import Ember from 'ember';

export default Ember.Route.extend({
    purecloud: Ember.inject.service(),
    model(){
        //return {
        //    iframeUrl: "http://mypurecloud.github.io/openapi-explorer/"
    //    }
        console.log("opening api explorer to " + window.location.search);
        return "https://apps.inindca.com/openapi-explorer/"+ window.location.search +"#token_type=bearer&access_token=" + this.get("purecloud").get("session").authToken();
    }
});
