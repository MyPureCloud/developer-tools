/*global $*/

import Ember from 'ember';
var  {observer, computed} = Ember;
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

export default Ember.Controller.extend({
    purecloud: Ember.inject.service('purecloud'),
    pageSize: 25,
    pageNumber: 1,
    getUsers: true,
    getGroups: true,
    getLocations: true,
    getChats: false,
    sortOptions:["ASC", "DESC", "SCORE"],
    sort: "ASC",
    searchType: 'general_search',
    searchTypes:[
        {
            name: "General search",
            id:"general_search",
            url:"/api/v2/search?profile=false"
        },
        {
            name: "Suggest",
            id:"suggest",
            url:"/api/v2/search/suggest?profile=false"
        }
    ],
    queryTypes:[
            "EXACT",
            "CONTAINS",
             "STARTS_WITH",
    //         "REQUIRED_FIELDS",
             "RANGE",
             "DATE_RANGE",
             "LESS_THAN",
             "LESS_THAN_EQUAL_TO",
             "GREATER_THAN",
             "GREATER_THAN_EQUAL_TO",
//             "TERM",
//             "TERMS".
    ],
    aggregateTypes:["COUNT", "SUM", "AVERAGE", "CONTAINS", "STARTS_WITH", "ENDS_WITH"],
    aggregateSort:["VALUE_DESC", "VALUE_ASC", "COUNT_DESC", "COUNT_ASC"],
    aggregates:[],
    queryFilters:[],
    queryFilterOperators:["AND", "OR", "NOT"],
    url: computed('searchType', function() {
        let type = this.get('searchType');
        for(let x=0; x< this.searchTypes.length; x++){
            if(this.searchTypes[x].id === type){
                return this.searchTypes[x].url;
            }
        }
    }),
    _calculateQueryJson(){
        let query = {
        	"pageSize": this.get("pageSize"),
        	"pageNumber": this.get("pageNumber"),
        	"types": []
        };

        if(this.get("searchType") === "general_search"){
            query.sortOrder = this.get("sort");
        }

        if(this.queryFilters.length > 0){
            query.query = this.queryFilters;
        }

        if(this.get("getUsers") === true){
            query.types.push("users");
        }

        if(this.get("getGroups") === true){
            query.types.push("groups");
        }

        if(this.get("getLocations") === true){
            query.types.push("locations");
        }

        if(this.get("getChats") === true){
            query.types.push("messages");
        }

        if(this.aggregates.length > 0){
            query.aggregations = this.aggregates;
        }

        this.set('queryJson', JSON.stringify(query, null, "  "));
    },
    queryObserver: observer('queryFilters', 'queryFilters.@each','queryFilters.@each.fields','queryFilters.@each.type',
                            'queryFilters.@each.operator','queryFilters.@each.value','queryFilters.@each.startValue',
                            'queryFilters.@each.endValue','sort','pageSize','pageNumber','getUsers','getGroups',
                            'getLocations','getChats', 'aggregates', 'aggregates.@each', 'aggregates.@each.field', 'aggregates.@each.type',
                            'aggregates.@each.name', 'aggregates.@each.value', function() {
        this._calculateQueryJson();
        this._setAvailableFilterFields();
    }),
    searchTypeObserver: observer("searchType", function(){
        this.queryFilters.clear();
        if(this.get("searchType") === "suggest"){
            this.queryFilters.pushObject({});
        }
    }),
    chatTypeObserver: observer("getChats", function(){
        if(this.get("getChats") === true){
            this.set("getLocations", false);
            this.set("getUsers", false);
            this.set("getGroups", false);
        }
    }),
    nonChatTypeObserver: observer("getLocations","getUsers", "getGroups", function(){
        if(this.get("getLocations") === true ||
                this.get("getUsers") === true ||
                this.get("getGroups") === true){
            this.set("getChats", false);
        }
    }),
    _setAvailableFilterFields(){
        let properties = [];

        function getPropertiesFromModel(modelProperties){
            for(let x=0;x<modelProperties.length;x++){
                let property = modelProperties[x];
                if(properties.indexOf(property) === -1){
                    properties.push(property);
                }
            }
        }

        let modelProperties = {
            "User":['id','name','department','email','title', 'username', 'presence', 'routingStatus', 'station', 'profileSkills'],
            "Group": ['id', 'name', 'description', 'dateModified', 'state', 'type', 'addresses', 'visibility'],
            "Location": ['id', 'name', 'address', 'addressVerified', 'emergencyNumber', 'state'],
            "Chat": ['body', 'created']
        };

        if(this.get("getUsers") === true){
            getPropertiesFromModel(modelProperties["User"]);
        }

        if(this.get("getGroups") === true){
            getPropertiesFromModel(modelProperties["Group"]);
        }

        if(this.get("getLocations") === true){
            getPropertiesFromModel(modelProperties["Location"]);
        }

        if(this.get("getChats") === true){
            getPropertiesFromModel(modelProperties["Chat"]);
        }

        properties.sort();

        this.set("availableFilterFields", properties);
    },
    queryJson:"",
    queryResult:null,
    init(){
        this._calculateQueryJson();
        this.get("getUsers");
        this.get("getChats");
        this._setAvailableFilterFields();
    },
    actions:{
        selectSearchType(type) {
            let currentType = this.get('searchType');

            if(currentType !== type){
                this.set('searchType', type);
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
            }).error(function(err){
                self.set("queryResult", JSON.stringify(err, null,  "  "));
            });
        },
        updateQuery(queryJson){
            console.log("update query", queryJson);
            this.set("queryJson", queryJson);

        },
        newQueryFilter(){
            if(this.get("searchType") === "general_search"){
                this.queryFilters.pushObject({
                    type:"STARTS_WITH",
                    fields:[],
                    operator: "OR"
                });
            }else{
                this.queryFilters.pushObject({

                });
            }
        },
        deleteQueryFilter(index){
            this.queryFilters.removeAt(index);
        },
        newAggregate(){
            this.aggregates.pushObject({
                type:"CONTAINS",
                field: this.get("availableFilterFields")[0]
            });
        },
        deleteAggregate(index){
            this.aggregates.removeAt(index);
        }
    }
});
