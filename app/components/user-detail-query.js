import Ember from 'ember';

export default Ember.Component.extend({
    purecloud: Ember.inject.service('purecloud'),
    userService: Ember.inject.service(),
    interval: null,
    order: "asc",
    orderOptions: ["asc","desc"],
    userFilters:['','userId'],
    presenceFilterValues: ['', 'organizationPresenceId', 'systemPresence'],
    routingStatusFilterValues: ['', 'routingStatus'],
    pageSize:25,
    pageNumber:1,
    users: Ember.computed('userService.users', function() {
       return this.get('userService').get('users');
    }),
    aggregations: [],
    routingStatusAggregations: [],
    usersFilters:[],
    presenceFilters:[],
    routingStatusFilters:[],
    queryJson:null,
    propertyWatcher: Ember.observer('routingStatusAggregations', 'routingStatusAggregations.@each', 'aggregations','aggregations.@each','interval', 'order', 'orderBy', 'pageSize', "pageNumber", "usersFilters", "usersFilters.@each", "presenceFilterValues", "presenceFilterValues.@each","routingStausFilterValues", "routingStausFilterValues.@each",
                                     function() {
        let json = JSON.stringify(this._computeValue(), null, " ");
        this.set("queryJson", json);
    }),
    _computeValue:function(){

        let query={
            interval: this.get("interval"),
            order: this.get("order"),
            paging: {
                pageSize: this.get("pageSize"),
                pageNumber: this.get("pageNumber")
            }
        };

        if(this.usersFilters.length > 0){
            query.usersFilters = this.get("usersFilters");
        }

        if(this.presenceFilters.length > 0){
            query.presenceFilters = this.get("presenceFilters");
        }

        if(this.routingStatusFilters.length > 0){
            query.routingStatusFilters = this.get("routingStatusFilters");
        }

        if(this.aggregations.length > 0){
            query.presenceAggregations = this.get("aggregations");
        }

        if(this.routingStatusAggregations.length > 0){
            query.routingStatusAggregations = this.get("routingStatusAggregations");
        }
        return query;
    },
    actions:{
        newAggregation: function(){
            this.aggregations.addObject({

            });
        },
        updateAggregation: function(index,aggregation){
            this.aggregations[index] = aggregation;
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        deleteAggregation:function(index){
            this.aggregations.removeAt(index);
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        newRoutingStatusAggregation: function(){
            this.routingStatusAggregations.addObject({

            });
        },
        updateRoutingStatusAggregation: function(index,aggregation){
            this.routingStatusAggregations[index] = aggregation;
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        deleteRoutingStatusAggregation:function(index){
            this.routingStatusAggregations.removeAt(index);
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        newUsersFilter: function(){
            this.usersFilters.addObject({
                type: "or",
                clauses: [],
                predicates: []
            });
        },
        updateUsersFilter: function(index,filter){
            this.usersFilters[index] = filter;
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        deleteUsersFilter:function(index){
            this.usersFilters.removeAt(index);
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        newPresenceFilter: function(){
            this.presenceFilters.addObject({
                type: "or",
                clauses: [],
                predicates: []
            });
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        updatePresenceFilter: function(index,filter){
            this.presenceFilters[index] = filter;
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        deletePresenceFilter:function(index){
            this.presenceFilters.removeAt(index);
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        newRoutingStatusFilter: function(){
            this.routingStatusFilters.addObject({
                type: "or",
                clauses: [],
                predicates: []
            });
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        updateRoutingStatusFilter: function(index,filter){
            this.routingStatusFilters[index] = filter;
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
        deleteRoutingStatusFilter:function(index){
            this.routingStatusFilters.removeAt(index);
            this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
        },
    }

});
