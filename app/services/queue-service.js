/* exported queues */
import Ember from 'ember';

export default Ember.Service.extend({

    purecloud: Ember.inject.service(),

    queues: [],

    updateQueuesFromPureCloud(){
        let self = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            let pureCloudSession = self.get("purecloud").get("session");

            let routingApi = self.get("purecloud").routingApi();

            function processPageOfQueues(results){
                self.queues.addObjects(results.entities);

                if(results.nextUri){
                    //get the next page of users directly
                    pureCloudSession.get(results.nextUri).then(processPageOfQueues).catch(function(err){
                        reject(err);
                    });
                }else{
                    resolve();
                }

            }
            routingApi.getQueues(25,0,'name', null, true).then(processPageOfQueues).catch(function(err){
                reject(err);
            });
        });
    },

    init() {
        this._super(...arguments);
        this.updateQueuesFromPureCloud();
    }
});
