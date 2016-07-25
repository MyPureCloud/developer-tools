import Ember from 'ember';

export default Ember.Component.extend({
    purecloud: Ember.inject.service('purecloud'),
    selectedMetrics:[],
    filter: null,
    init(){
        this._super(...arguments);
        this.get('filter');
    },
    _computeValue:function(){
        var selectedMetrics = this.get('selectedMetrics');

        let query={
            filter: this.get('filter')
        };

        if(selectedMetrics && selectedMetrics.length>0){
            query.metrics = selectedMetrics;
        }
        return query;
    },
    queryJson: Ember.computed('selectedMetrics.@each', 'filter', function() {
        console.log("queryJson");

        setTimeout(function(){
            window.resizeDiv();
        },100);


        return JSON.stringify(this._computeValue(), null, " ");
    }),
    actions:{
        runQuery: function(){
            let self = this;
            let value = this._computeValue();
            this.get('purecloud').analyticsApi().postQueuesObservationsQuery(value)
                .then(function(result){
                    self.set("queryResult", JSON.stringify(result, null, "  "));
                })
                .catch(function(error){
                    self.set("queryResult", error);
                });
        }
    }


});