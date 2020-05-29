import Ember from 'ember';

export default Ember.Component.extend({
	purecloud: Ember.inject.service('purecloud'),
	interval: null,
	segmentFilters: [],
	evaluationFilters: [],
	surveyFilters: [],
	conversationFilters: [],

	order: 'asc',
	orderOptions: ['asc', 'desc'],
	orderBy: 'conversationStart',
	orderByOptions: ['conversationStart', 'segmentStart', 'segmentEnd'],
	pageSize: 25,
	pageNumber: 1,
	aggregations: [],

	init() {
		this._super(...arguments);
	},
	_computeValue: function() {
		let query = {
			interval: this.get('interval'),
			order: this.get('order'),
			orderBy: this.get('orderBy'),
			paging: {
				pageSize: this.get('pageSize'),
				pageNumber: this.get('pageNumber')
			}
		};

		if (this.segmentFilters.length > 0) {
			query.segmentFilters = this.get('segmentFilters');
		}

		if (this.conversationFilters.length > 0) {
			query.conversationFilters = this.get('conversationFilters');
		}

		if (this.evaluationFilters.length > 0) {
			query.evaluationFilters = this.get('evaluationFilters');
		}

		if (this.surveyFilters.length > 0) {
			query.surveyFilters = this.get('surveyFilters');
		}

		if (this.aggregations.length > 0) {
			query['aggregations'] = this.get('aggregations');
		}

		return query;
	},
	propertyWatcher: Ember.observer(
		'aggregations',
		'aggregations.@each',
		'interval',
		'order',
		'orderBy',
		'pageSize',
		'pageNumber',
		'conversationFilter',
		'evaluationFilter',
		'segmentFilter',
		'hasConversationFilter',
		'hasSegmentFilter',
		'hasEvaluationFilter',
		function() {
			let json = JSON.stringify(this._computeValue(), null, ' ');
			this.set('queryJson', json);
		}
	),
	queryJson: null,
	actions: {
		newAggregation: function() {
			this.aggregations.addObject({});
		},
		updateAggregation: function(index, aggregation) {
			this.aggregations[index] = aggregation;
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		deleteAggregation: function(index) {
			this.aggregations.removeAt(index);
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		newSegmentFilter: function() {
			this.segmentFilters.addObject({
				type: 'or',
				clauses: [],
				predicates: []
			});
		},
		updateSegmentFilter: function(index, filter) {
			this.segmentFilters[index] = filter;
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		deleteSegmentFilter: function(index) {
			this.segmentFilters.removeAt(index);
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		newEvaluationFilter: function() {
			this.evaluationFilters.addObject({
				type: 'or',
				clauses: [],
				predicates: []
			});
		},
		updateEvaluationFilter: function(index, filter) {
			this.evaluationFilters[index] = filter;
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		deleteEvaluationFilter: function(index) {
			this.evaluationFilters.removeAt(index);
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		newSurveyFilter: function() {
			this.surveyFilters.addObject({
				type: 'or',
				clauses: [],
				predicates: []
			});
		},
		updateSurveyFilter: function(index, filter) {
			this.surveyFilters[index] = filter;
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		deleteSurveyFilter: function(index) {
			this.evaluationFilters.removeAt(index);
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		newConversationFilter: function() {
			this.conversationFilters.addObject({
				type: 'or',
				clauses: [],
				predicates: []
			});
		},
		updateConversationFilter: function(index, filter) {
			this.conversationFilters[index] = filter;
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		},
		deleteConversationFilter: function(index) {
			this.conversationFilters.removeAt(index);
			this.set('queryJson', JSON.stringify(this._computeValue(), null, ' '));
		}
	}
});
