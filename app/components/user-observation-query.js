import Ember from 'ember';

export default Ember.Component.extend({
	purecloud: Ember.inject.service('purecloud'),
	analyticsValueService: Ember.inject.service(),
	selectedMetrics: [],
	userObservationFilter: [],
	filter: null,
	init() {
		this._super(...arguments);
		this.get('filter');
		this.set('queryJson', '{}');
		this.userObservationFilter = this.get('analyticsValueService').getDimensions(this.get('query'));
	},
	_computeValue: function() {
		var selectedMetrics = this.get('selectedMetrics');

		let query = {
			filter: this.get('filter')
		};

		if (selectedMetrics && selectedMetrics.length > 0) {
			query.metrics = selectedMetrics;
		}
		return query;
	},
	queryJson: null,
	_observeChanges: Ember.observer('selectedMetrics.@each', 'filter', function() {
		let query = JSON.stringify(this._computeValue(), null, ' ');
		this.set('queryJson', query);
	})
});
