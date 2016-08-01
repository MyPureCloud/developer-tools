/* globals ga */
import Ember from 'ember';
import config from '../config/environment';

let DEV_TOOLS_CATEGORY = 'Dev Tools';
export default Ember.Service.extend(Ember.Evented,{
    logEvent(action, label) {
        if(ga && config.analyticsTrackingId){
            ga('send', 'event', DEV_TOOLS_CATEGORY, action, label);
        }
    },
    logNotificationRegistration(id) {
        this.get("logEvent")("Notification Registration", id);
    },
    logCodeExecution() {
        this.get("logEvent")("Code Executed");
    },
    logExporerExecution(httpMethod, url) {
        this.get("logEvent")("Explorer Request", httpMethod + " " + url);
    },

    init() {
    //    console.log(Router)
        //this.get('router').on('currentPathDidChange', path => this.onPathChange(path));
    },

});
