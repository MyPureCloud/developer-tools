/*global $*/

import Ember from 'ember';
var  computed = Ember.computed;
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

export default Ember.Controller.extend({
    purecloud: Ember.inject.service('purecloud'),
    queryType: 'conversation_detail',
    queryTypes:[
        {
            name: "Conversation Detail",
            id:"conversation_detail",
            url:"/api/v2/analytics/conversations/details/query"
        },
        {
            name: "Conversation Aggregate",
            id:"conversation_aggregate",
            url:"/api/v2/analytics/conversations/aggregates/query"
        },
        {
            name: "User Status Aggregate",
            id:"user_aggregate",
            url:"/api/v2/analytics/users/aggregates/query"
        },
        {
            name: "User Observation",
            id:"user_observation",
            url:"/api/v2/analytics/users/observations/query"
        },
        {
            name: "Queue Observation",
            id:"queue_observation",
            url:"/api/v2/analytics/queues/observations/query"
        }

    ],
    query:{},
    url: computed('queryType', function() {
        let type = this.get('queryType');
        for(let x=0; x< this.queryTypes.length; x++){
            if(this.queryTypes[x].id === type){
                return this.queryTypes[x].url;
            }
        }
    }),
    queryJson:"",
    queryResult:null,
    actions:{
        selectQueryType(type) {
            let currentType = this.get('queryType');

            if(currentType !== type){
                this.set("queryJson","{}");
                this.set('queryType', type);
            }
        },
        runQuery(){
            let query = this.get("queryJson");

            let url = this.get("url");
            let environment = purecloudEnvironmentTld();
            let purecloud = this.get("purecloud");

            let requestUrl = `https://api.${environment}${url}`;

            let self = this;

            $.ajax({
                type: "POST",
                url: requestUrl,
                data: query,
                timeout: 5000,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers:{
                    "Authorization" : "bearer " + purecloud.get("session").options.token
                }
            }) .done(function( data ) {
                self.set("queryResult", JSON.stringify(data, null,  "  "));
            }).error(function( data ) {
                self.set("queryResult", JSON.stringify(data, null,  "  "));
            });
        },
        updateQuery(queryJson){
            console.log("update query", queryJson);
            this.set("queryJson", queryJson);

        },

    },


});
