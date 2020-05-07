import Ember from 'ember';

export default Ember.Component.extend({
	purecloud: Ember.inject.service('purecloud'),
	filter: null,
	granularity: null,
	interval: null,
	groupBy: ['userId'],
	selectedMetrics: [],
	userFilters: ['', 'userId'],
	init() {
		this._super(...arguments);
		this.get('filter');
	},
	_computeValue: function() {
		let query = {};

		var interval = this.get('interval');
		if (interval) {
			query.interval = interval;
		}

		var granularity = this.get('granularity');
		if (granularity) {
			query.granularity = granularity;
		}

		var groupBy = this.get('groupBy');
		if (groupBy && groupBy !== '') {
			query.groupBy = groupBy;
		}

		var filter = this.get('filter');
		if (filter) {
			query.filter = filter;
		}

		var selectedMetrics = this.get('selectedMetrics');
		if (selectedMetrics && selectedMetrics.length > 0) {
			query.metrics = selectedMetrics;
		}

		return query;
	},
	queryJson: null,
	_observeChanges: Ember.observer('granularity', 'interval', 'groupBy', 'filter', 'selectedMetrics', function() {
		let query = JSON.stringify(this._computeValue(), null, ' ');
		this.set('queryJson', query);
	})
});
