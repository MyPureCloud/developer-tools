import Ember from 'ember';

export default Ember.Component.extend({
    analyticsService: Ember.inject.service(),
    actions:{
        execute(){
            this.get("analyticsService").logAnalyticsBuilderExecution(this.get("queryType"));
            this.get("runQuery")();
        }
    }
});
