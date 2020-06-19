import Ember from 'ember';

var observer = Ember.observer;
export default Ember.Component.extend({
	analyticsValueService: Ember.inject.service(),
	dimensions: [
		'',
		'queueId',
		'purpose',
		'groupId',
		'requestedRoutingSkillId',
		'requestedLanguageId',
		'wrapUpCode',
		'direction',
		'segmentType'
	],
	metrics: ['', 'tSegmentDuration'],
	aggregationTypes: [],
	aggregationType: 'termFrequency',
	query: 'default',

	init: function() {
		this._super(...arguments);

		this.set('aggregationTypes', this.get('analyticsValueService').get('aggregationTypes'));

		let aggregation = this.get('aggregation');
		if (aggregation) {
			if (aggregation.type) {
				this.set('aggregationType', aggregation.type);
			}

			this.set('dimension', aggregation.dimension);
			this.set('frequencySize', aggregation.size);
			this.set('metric', aggregation.metric);

			if (aggregation.ranges && aggregation.ranges.length > 0) {
				this.set('range', aggregation.ranges[0]);
			}
		}

		let query = this.get('query');
		if (query && query !== 'default') {
			let values = this.get('analyticsValueService').getMetrics(query);
			this.metrics = [''];
			for (const value of values)	this.metrics.push(value);
		}
	},

	isOnChanged: observer('frequencySize', 'range', 'dimension', 'metric', function() {
		this.set('aggregation', this._computeValue());
		this.get('updateAggregation')(this.get('index'), this._computeValue());
	}),

	_computeValue: function() {
		let aggregation = {
			type: this.get('aggregationType')
		};

		if (aggregation.type === 'termFrequency') {
			aggregation.dimension = this.get('dimension');
			aggregation.size = this.get('frequencySize');
		} else if (aggregation.type === 'numericRange') {
			aggregation.metric = this.get('metric');

			aggregation.ranges = [this.get('range')];
		}

		return aggregation;
	},
	actions: {
		delete: function() {
			this.get('deleteAggregation')(this.get('index'));
		}
	}
});
