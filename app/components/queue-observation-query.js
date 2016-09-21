import Ember from 'ember';

export default Ember.Component.extend({
    purecloud: Ember.inject.service('purecloud'),
    selectedMetrics:[],
    filter: null,
    init(){
        this._super(...arguments);
        this.get('filter');
        this.set("queryJson", "{}");
    },
    didRender() {
      this._super(...arguments);
      this.set("queryJson", "{}");
    },
    _computeValue:function(){
        var selectedMetrics = this.get('selectedMetrics');

        let filter = this.get('filter');
        let query={

        };

        if(filter){
            query["filter"] = filter;
        }

        if(selectedMetrics && selectedMetrics.length>0){
            query.metrics = selectedMetrics;
        }

        this.sendAction("updateQuery", query);
        return query;
    },
    queryJson: null,
    propertyWatcher: Ember.observer('selectedMetrics.@each', 'filter', function() {
        let query =  JSON.stringify(this._computeValue(), null, " ");
        this.set("queryJson", query);
    })
});
