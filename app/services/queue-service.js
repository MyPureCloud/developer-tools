/* exported queues */
import Ember from 'ember';

export default Ember.Service.extend({

    purecloud: Ember.inject.service(),

    queues: [],

    init() {
        this._super(...arguments);

        let self = this;
        let pureCloudSession = this.get("purecloud").get("session");

        let routingApi = self.get("purecloud").routingApi();

        function processPageOfQueues(results){
            self.queues.addObjects(results.entities);

            if(results.nextUri){
                //get the next page of users directly
                pureCloudSession.get(results.nextUri).then(processPageOfQueues);
            }

        }
        routingApi.getQueues(25,0,'name', null, true).then(processPageOfQueues);

    }
});
