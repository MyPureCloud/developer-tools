import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Component.extend({
	analyticsValueService: Ember.inject.service(),
	availableMetrics: computed('analyticsValueService.swaggerLoaded', function() {
		return this.get('analyticsValueService').getMetrics(this.get('query')).slice();
	}),
	query: "default",
	queues: computed('queueService.queues', function() {
		return this.get('queueService').get('queues');
	}),
	init: function() {

		this._super(...arguments);
	},
	didReceiveAttrs() {
		this._super(...arguments);

		let override = this.get('metricsOverride');

		if (typeof override !== 'undefined' && override !== null) {
			this.set('availableMetrics', override);
		}
	}
});
