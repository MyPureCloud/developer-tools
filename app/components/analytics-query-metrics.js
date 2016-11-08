import Ember from 'ember';

export default Ember.Component.extend({
    analyticsValueService: Ember.inject.service(),
    init: function(){

        this._super(...arguments);
        let metrics = this.get("analyticsValueService").get("metrics");
        this.set("availableMetrics", metrics);
    },
    didReceiveAttrs() {
        this._super(...arguments);

        let override = this.get("metricsOverride");

        if(typeof override !== 'undefined' && override !== null ){
            this.set("availableMetrics", override);
        }
    }
});
