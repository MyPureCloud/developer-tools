import Ember from 'ember';

export default Ember.Component.extend({
    analyticsValueService: Ember.inject.service(),
    init: function(){

        this._super(...arguments);

        this.set("availableMetrics", this.get("analyticsValueService").get("metrics"));
    },
    didReceiveAttrs() {
        this._super(...arguments);
        if(this.get("metricsOverride") !== null){
            this.set("availableMetrics", this.get("metricsOverride"));
        }
    }
});
