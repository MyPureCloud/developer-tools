import Ember from 'ember';

export default Ember.Controller.extend({
    purecloud: Ember.inject.service('purecloud'),
    queryType: 'conversation_aggregate',
    queryTypes:[
        {
            name: "Conversations Aggregate Query",
            id:"conversation_aggregate"
        },
        {
            name: "User Observation Query",
            id:"user_observation"
        },
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
