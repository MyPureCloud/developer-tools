import Ember from 'ember';

export default Ember.Route.extend({
    purecloud: Ember.inject.service('purecloud'),
    
    channel: null,

    model(){
        var pureCloudSession = this.get('purecloud').session();

        var api = new NotificationsApi(pureCloudSession);

        api.postChannels().done(function(channel){


        });
        return api.getAvailabletopics("description,schema")
    }
});
