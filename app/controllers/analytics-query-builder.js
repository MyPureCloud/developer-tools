import Ember from 'ember';

export default Ember.Controller.extend({
    purecloud: Ember.inject.service('purecloud'),
    queryType: 'queue_observation',
    queryTypes:[
        {
            name: "Queue Observation Query",
            id:"queue_observation"
        }
    ],
    query:{},
    actions:{
        selectQueryType(type) {
            this.set('queryType', type);
        },

    }

});
