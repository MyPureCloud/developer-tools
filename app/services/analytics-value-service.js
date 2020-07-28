import Ember from 'ember';
import Fallbacks from '../models/analytics-value-service-query-fallbacks';

export default Ember.Service.extend({
	// dimensions, metrics, and groupBy will be overwritten, but leaving some initial values as a fallback
	dimensions: Fallbacks.dimensions,
	metrics: Fallbacks.metrics,
	detailMetrics: Fallbacks.detailMetrics,
	groupBy: Fallbacks.groupBy,

	// swaggerLoaded: false,

	conversationDetailConversationFilter: Fallbacks.conversationDetailConversationFilter,
	conversationDetailEvaluationFilter: Fallbacks.conversationDetailEvaluationFilter,
	conversationDetailSurveyFilter: Fallbacks.conversationDetailSurveyFilter,
	conversationDetailSegmentFilter: Fallbacks.conversationDetailSegmentFilter,

	conversationAggregate: Fallbacks.conversationAggregate,
	conversationAggregateFilter: Fallbacks.conversationAggregateFilter,
	conversationAggregateView: Fallbacks.conversationAggregateView,

	flowAggregate: Fallbacks.flowAggregate,
	flowAggregateFilter: Fallbacks.flowAggregateFilter,
	flowAggregateView: Fallbacks.flowAggregateView,

	userAggregate: Fallbacks.userAggregate,
	userAggregateFilter: Fallbacks.userAggregateFilter,
	
	flowObservation: Fallbacks.flowObservation,
	
	queueObservation: Fallbacks.queueObservation,
	
	userObservation: Fallbacks.userObservation,

	propertyTypes: ['', 'bool', 'integer', 'real', 'date', 'string', 'uuid'].sort(),
	operators: ['matches', 'exists', 'notExists'],
	numericRangeOperators: ['lt', 'lte', 'gt', 'gte'],
	mediaTypes: ['', 'voice', 'chat', 'email', 'callback', 'screenshare', 'cobrowse', 'message'].sort(),
	aggregationTypes: ['termFrequency', 'numericRange'],
	swaggerService: Ember.inject.service(),
	filteredMetrics: function(filter) {
		var patt = new RegExp(filter);

		return this.get('metrics').filter(function(item) {
			return patt.test(item);
		});
	},
	getValuesFromSwagger: function() {
		try {
			let swagger = this.get('swaggerService').get('swagger');

			if (!swagger || !swagger.definitions) {
				return;
			}

			let queryToSwaggerMappings = [
				{ query: "conversationDetailConversationFilter", swaggerDefinition: "ConversationDetailQueryPredicate" },
				{ query: "conversationDetailEvaluationFilter", swaggerDefinition:  "EvaluationDetailQueryPredicate" },
				{ query: "conversationDetailSurveyFilter", swaggerDefinition: "SurveyDetailQueryPredicate" },
				{ query: "conversationDetailSegmentFilter", swaggerDefinition: "SegmentDetailQueryPredicate" },

				{ query: "conversationAggregate", swaggerDefinition: "ConversationAggregationQuery" },
				{ query: "conversationAggregateFilter", swaggerDefinition: "ConversationAggregateQueryPredicate" },
				{ query: "conversationAggregateView", swaggerDefinition: "ConversationAggregationView" },

				{ query: "flowAggregate", swaggerDefinition: "FlowAggregationQuery" },
				{ query: "flowAggregateFilter", swaggerDefinition: "FlowAggregateQueryPredicate" },
				{ query: "flowAggregateView", swaggerDefinition: "FlowAggregationView" },

				{ query: "userAggregate", swaggerDefinition: "UserAggregationQuery" },

				{ query: "queueObservation", swaggerDefinition: "QueueObservationQuery" },

				{ query: "flowObservation", swaggerDefinition: "FlowObservationQuery" },

				{ query: "userObservation", swaggerDefinition: "UserObservationQuery" }

			];

			for (const value of queryToSwaggerMappings) {
				if (value.query.endsWith("View")) {
					var metrics = swagger.definitions[value.swaggerDefinition].properties.target;
					if (metrics && this[value.query].metrics) {
						this[value.query].metrics.clear();
						this[value.query].metrics.pushObjects(metrics.enum.sort());
					}
				} else {
					var dimensions = swagger.definitions[value.swaggerDefinition].properties.dimension;
					if (dimensions && this[value.query].dimensions) {
						this[value.query].dimensions.clear();
						this[value.query].dimensions.pushObjects(dimensions.enum.sort());
					}
					var metrics = swagger.definitions[value.swaggerDefinition].properties.metric;
					if (metrics && this[value.query].metrics) {
						this[value.query].metrics.clear();
						this[value.query].metrics.pushObjects(metrics.enum.sort());
					}
					var detailMetrics = swagger.definitions[value.swaggerDefinition].properties.detailMetrics;
					if (detailMetrics && this[value.query].detailMetrics) {
						this[value.query].detailMetrics.clear();
						this[value.query].detailMetrics.pushObjects(detailMetrics.items.enum.sort());
					}
					var groupBy = swagger.definitions[value.swaggerDefinition].properties.groupBy;
					if (groupBy && this[value.query].groupBy) {
						this[value.query].groupBy.clear();
						this[value.query].groupBy.pushObjects(groupBy.items.enum.sort());
					}
				}
			}
			// this.set('swaggerLoaded',true);
		} catch (err) {
			console.error("Failed while trying to parse swagger definitions");
			console.error(err);
		}
	},
	getGroupBy(query) {
		if (query !== undefined && query === "default") {
			return this.groupBy;
		} else if (query === undefined || this[query] === undefined || this[query].groupBy === undefined) {
			console.error("Failed to find groupBy values for query '" + query + "', returning defaults");
			return this.groupBy;
		}
		return this[query].groupBy;
	},
	getMetrics(query) {
		if (query !== undefined && query === "default") {
			return this.metrics;
		} else if (query === undefined || this[query] === undefined || this[query].metrics === undefined) {
			console.error("Failed to find metrics for query '" + query + "', returning defaults");
			return this.metrics;
		}
		return this[query].metrics;
	},
	getDetailMetrics(query) {
		if (query !== undefined && query === "default") {
			return this.detailMetrics;
		} else if (query === undefined || this[query] === undefined || this[query].detailMetrics === undefined) {
			console.error("Failed to find detail metrics for query '" + query + "', returning defaults");
			return this.detailMetrics;
		}
		return this[query].detailMetrics;
	},
	getDimensions(query) {
		if (query !== undefined && query === "default") {
			return this.dimensions;
		} else if (query === undefined || this[query] === undefined || this[query].dimensions === undefined) {
			console.error("Failed to find dimensions for query '" + query + "', returning defaults");
			return this.dimensions;
		}
		return this[query].dimensions;
	},
	init() {
		let that = this;
		// Ensure this always runs in case value is already set
		that.getValuesFromSwagger();

		// Set observer
		that.get('swaggerService').addObserver('swagger', function() {
			that.getValuesFromSwagger();
		});
	}
});
