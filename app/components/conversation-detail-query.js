import Ember from 'ember';
var observer = Ember.observer;

export default Ember.Component.extend({
    purecloud: Ember.inject.service('purecloud'),
    interval: null,
    segmentFilter: null,
    evaluationFilter: null,
    conversationFilter: null,

    order: "asc",
    orderOptions: ["asc","desc"],
    orderBy: "conversationStart",
    orderByOptions: ["conversationStart", "segmentStart", "segmentEnd"],
    pageSize:25,
    pageNumber:1,
    aggregations:[],

    init(){
        this._super(...arguments);
        this.get('filter');
    },
    _computeValue:function(){

        let query={
            interval: this.get("interval"),
            order: this.get("order"),
            orderBy: this.get("orderBy"),
            paging: {
                pageSize: this.get("pageSize"),
                pageNumber: this.get("pageNumber")
            }
        };


        var hasConversationFilter = this.get('hasConversationFilter');
        if(hasConversationFilter){
            query.conversationFilter = this.get("conversationFilter");
        }

        var hasSegmentFilter = this.get('hasSegmentFilter');
        if(hasSegmentFilter){
            query.segmentFilter = this.get("segmentFilter");
        }

        var hasEvaluationFilter = this.get('hasEvaluationFilter');
        if(hasEvaluationFilter){
            query.evaluationFilter = this.get("evaluationFilter");
        }

        if(this.aggregations.length > 0){
            query["aggregations"] = this.get("aggregations");
        }

        return query;
    },
    propertyWatcher: Ember.observer('aggregations','aggregations.@each','interval', 'order', 'orderBy', 'pageSize', "pageNumber", "conversationFilter", "evaluationFilter", "segmentFilter", "hasConversationFilter", "hasSegmentFilter", "hasEvaluationFilter", function() {
        setTimeout(function(){
            window.resizeDiv();
        },100);


        this.set("queryJson", JSON.stringify(this._computeValue(), null, " "));
    }),
    queryJson:null,
    actions:{
        runQuery: function(){
            let self = this;
            let value = this._computeValue();
            this.get('purecloud').analyticsApi().postConversationsDetailsQuery(value)
                .then(function(result){
                    self.set("queryResult", JSON.stringify(result, null, "  "));
                })
                .catch(function(error){
                    try{
                        self.set("queryResult", error.statusText + ": " + error.response.body.message);
                    }catch(e){
                        self.set("queryResult", error);
                    }
                });
        },
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
        }
    }


});
