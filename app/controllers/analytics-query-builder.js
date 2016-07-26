import Ember from 'ember';
var  computed = Ember.computed;

export default Ember.Controller.extend({
    purecloud: Ember.inject.service('purecloud'),
    queryType: 'conversation_detail',
    queryTypes:[
        {
            name: "Conversation Detail Query",
            id:"conversation_detail",
            url:"/api/v2/analytics/conversations/details/query"
        },
        {
            name: "Conversation Aggregate Query",
            id:"conversation_aggregate",
            url:"/api/v2/analytics/conversations/aggregates/query"
        },
        {
            name: "User Observation Query",
            id:"user_observation",
            url:"/api/v2/analytics/users/observations/query"
        },
        {
            name: "Queue Observation Query",
            id:"queue_observation",
            url:"/api/v2/analytics/queues/observations/query"
        }

    ],
    query:{},
    url: computed('queryType', function() {
       let type = this.get('queryType');
       for(let x=0; x< this.queryTypes.length; x++){
           if(this.queryTypes[x].id == type){
               return this.queryTypes[x].url;
           }
       }
    }),
    actions:{
        selectQueryType(type) {
            this.set('queryType', type);
        },

    }

});
