import Ember from 'ember';

export default Ember.Component.extend({
	analyticsValueService: Ember.inject.service(),
	query: "default",
	init: function() {
		this._super(...arguments);

		this.set('availableMetrics', this.get('analyticsValueService').getMetrics(this.get('query')));
	},
	didReceiveAttrs() {
		this._super(...arguments);

		let override = this.get('metricsOverride');

		if (typeof override !== 'undefined' && override !== null) {
			this.set('availableMetrics', override);
		}
	}
});
