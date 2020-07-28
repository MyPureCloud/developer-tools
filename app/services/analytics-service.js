/* global newrelic */
import Ember from 'ember';
import config from '../config/environment';

let DEV_TOOLS_CATEGORY = 'Dev Tools';
export default Ember.Service.extend(Ember.Evented, {

	logEvent(action, label) {
		try{
			if (typeof window.ga !== 'undefined' && config.analyticsTrackingId) {
				window.ga('send', 'event', DEV_TOOLS_CATEGORY, action, label);
			}

			if (typeof window.newrelic !== 'undefined') {
				newrelic.addPageAction(DEV_TOOLS_CATEGORY, {
					action: action,
					lanel: label
				});
			}
		} catch(err) {
			console.log(err.stack);
		}
	},
	logNotificationRegistration(id) {
		this.get('logEvent')('Notification Registration', id);
	},
	logCodeExecution() {
		this.get('logEvent')('Code Executed');
	},
	logExporerExecution(httpMethod, url) {
		this.get('logEvent')('Explorer Request', httpMethod + ' ' + url);
	},
	logAnalyticsBuilderExecution(queryType) {
		this.get('logEvent')('Query Builder Exec', queryType);
	}
});
