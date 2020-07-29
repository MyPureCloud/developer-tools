import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Component.extend({
	analyticsValueService: Ember.inject.service(),
	availableDetailMetrics: computed('analyticsValueService.swaggerLoaded', function() {
		return this.get('analyticsValueService').getDetailMetrics(this.get('query'));
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
			this.set('availableDetailMetrics', override);
		}
	}
});
