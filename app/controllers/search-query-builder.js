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
    sortOptions:["ASC", "DESC", "SCORE"],
    sort: "SCORE",
    searchType: 'general_search',
    searchTypes:[
        {
            name: "General search",
            id:"general_search",
            url:"/api/v2/search?profile=true"
        },
        {
            name: "Suggest",
            id:"suggest",
            url:"/api/v2/search/suggest?profile=true"
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
             "TERM"
//             "TERMS".
    ],
    aggregateTypes:["COUNT", "SUM", "AVERAGE", "TERM", "CONTAINS", "STARTS_WITH", "ENDS_WITH"],
    aggregateSort:["VALUE_DESC", "VALUE_ASC", "COUNT_DESC", "COUNT_ASC"],
    aggregates:[],
    queryFilters:[],
    queryFilterOperators:["AND", "OR", "NOT"],
    profileQueryParameter: true,
    returnFields:["guid"],
    url: computed('searchType', 'profileQueryParameter', function() {
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

        if ((this.get("searchType") === "general_search") && this.profileQueryParameter) {
            query.returnFields = this.get("returnFields");
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

        if(this.aggregates.length > 0){
            query.aggregations = this.aggregates;
        }

        this.set('queryJson', JSON.stringify(query, null, "  "));
    },
    queryObserver: observer('queryFilters', 'queryFilters.@each','queryFilters.@each.fields','queryFilters.@each.type',
                            'queryFilters.@each.operator','queryFilters.@each.value','queryFilters.@each.startValue',
                            'queryFilters.@each.endValue','sort','pageSize','pageNumber','getUsers','getGroups',
                            'getLocations', 'aggregates', 'aggregates.@each', 'aggregates.@each.field', 'aggregates.@each.type',
                            'aggregates.@each.name', 'aggregates.@each.value', 'returnFields', 'profileQueryParameter', function() {
        this._calculateQueryJson();
        this._setAvailableFilterFields();
        this._setSearchTypeUrls();
    }),
    searchTypeObserver: observer("searchType", function(){
        this.queryFilters.clear();
        this._setInitialFilter();
        this.aggregates.clear();
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
            "Location": ['id', 'name', 'address', 'addressVerified', 'emergencyNumber', 'state']
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

        properties.sort();

        this.set("availableFilterFields", properties);
    },
    _setSearchTypeUrls(){
        for (let x=0; x< this.searchTypes.length; x++){
            if (this.searchTypes[x].id === "general_search") {
                this.set("url", "/api/v2/search?profile=" + this.profileQueryParameter)
            } else {
                this.set("url", "/api/v2/search/suggest?profile=" + this.profileQueryParameter)
            }
        }
    },
    _setInitialFilter(){
        if (this.get("searchType") === "general_search"){
            this.queryFilters.pushObject({
                type:"TERM",
                fields:["name"],
                value: "mySearchKeyword",
                operator: "AND"
            });
        } else {
            this.queryFilters.pushObject({
                value: "mySuggestKeyword"
            });
        }
    },
    queryJson:"",
    queryResult:null,
    init(){
        this._setInitialFilter();
        this._calculateQueryJson();
        this.get("getUsers");
        this._setAvailableFilterFields();
        this._setSearchTypeUrls();
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
                    type:"TERM",
                    fields:[],
                    operator: "AND"
                });
            }else{
                this.queryFilters.pushObject({
                    value: "mySuggestKeyword"
                });
            }
        },
        deleteQueryFilter(index){
            this.queryFilters.removeAt(index);
        },
        newAggregate(){
            this.aggregates.pushObject({
                type:"TERM",
                field: this.get("availableFilterFields")[4],
                name: "myAggregationBucketName"
            });
        },
        deleteAggregate(index){
            this.aggregates.removeAt(index);
        }
    }
});
