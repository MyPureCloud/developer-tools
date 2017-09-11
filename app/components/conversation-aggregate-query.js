import Ember from 'ember';

export default Ember.Component.extend({
    purecloud: Ember.inject.service('purecloud'),
    filter: null,
    granularity: null,
    interval: null,
    groupBy: [],
    selectedMetrics:[],
    views: [],
    flattenMultivaluedDimensions: false,
    init(){
        this._super(...arguments);
        this.get('filter');
    },
    _computeValue:function(){

        let query={

        };

        var interval = this.get('interval');
        if(interval){
            query.interval = interval;
        }

        var granularity = this.get('granularity');
        if(granularity){
            query.granularity = granularity;
        }

        var groupBy = this.get("groupBy");
        if(groupBy && groupBy !== ''){
            query.groupBy = groupBy;
        }

        var filter = this.get("filter");
        if(filter){
            query.filter = filter;
        }

        var views = this.get("views");
        if(views){
            query.views = views;
        }

        var selectedMetrics = this.get('selectedMetrics');
        if(selectedMetrics && selectedMetrics.length>0){
            query.metrics = selectedMetrics;
        }

        var flattenMultivaluedDimensions = this.get('flattenMultivaluedDimensions');
        if(flattenMultivaluedDimensions === true){
            query.flattenMultivaluedDimensions = flattenMultivaluedDimensions;
        }

        return query;
    },
    queryJson:null,
    _observeChanges: Ember.observer('views.@each', 'views.@each.name','views.@each.range','views.@each.range.lt', 'views.@each.gte', 'granularity', 'interval', 'groupBy', 'filter', "flattenMultivaluedDimensions", 'selectedMetrics', function() {
        let query = JSON.stringify(this._computeValue(), null, " ");
        this.set('queryJson', query);
    }),
    actions:{
        newView(){
            this.views.pushObject({
                name: "name",
                function: "rangeBound",
                range:{
                    lt:10,
                    gte:0
                }

            });
        },
        deleteView(index){
            this.views.removeAt(index);
        }
    }
});
