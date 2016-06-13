import Ember from 'ember';

export default Ember.Route.extend({
    purecloud: Ember.inject.service(),
    model(){
        //return {
        //    iframeUrl: "http://mypurecloud.github.io/openapi-explorer/"
    //    }
return "https://apps.inindca.com/openapi-explorer/#token_type=bearer&access_token=" + this.get("purecloud").get("session").authToken();
    }
});
