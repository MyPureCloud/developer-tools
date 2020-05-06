import Ember from 'ember';

export default Ember.Service.extend({
	// dimensions, metrics, and groupBy will be overwritten, but leaving some initial values as a fallback
	dimensions: [
		'conversationId',
		'sessionId',
		'mediaType',
		'queueId',
		'userId',
		'participantId',
		'participantName',
		'direction',
		'wrapUpCode',
		'wrapUpNote',
		'interactionType',
		'requestedRoutingSkillId',
		'requestedLanguageId',
		'purpose',
		'participantType',
		'segmentType',
		'disconnectType',
		'errorCode',
		'conversationEnd',
		'segmentEnd',
		'externalContactId',
		'externalOrganizationId',
		'stationId',
		'edgeId',
		'dnis',
		'ani',
		'outboundCampaignId',
		'outboundContactId',
		'outboundContactListId',
		'monitoredParticipantId',
		'sourceSessionId',
		'destinationSessionId',
		'sourceConversationId',
		'destinationConversationId',
		'remoteNameDisplayable',
		'sipResponseCode',
		'q850ResponseCode',
		'conference',
		'groupId',
		'roomId',
		'addressFrom',
		'addressTo',
		'subject',
		'peerId',
		'scriptId',
		'evaluationId',
		'evaluatorId',
		'contextId',
		'formId',
		'formName',
		'eventTime',
		'systemPresence',
		'organizationPresenceId',
		'routingStatus'
	].sort(),
	metrics: [
		'tSegmentDuration',
		'tConversationDuration',
		'oTotalCriticalScore',
		'oTotalScore',
		'nEvaluations',
		'tAbandon',
		'tIvr',
		'tAnswered',
		'tAcd',
		'tTalk',
		'tHeld',
		'tTalkComplete',
		'tHeldComplete',
		'tAcw',
		'tHandle',
		'tWait',
		'tAgentRoutingStatus',
		'tOrganizationPresence',
		'tSystemPresence',
		'tUserResponseTime',
		'tAgentResponseTime',
		'nOffered',
		'nOverSla',
		'nTransferred',
		'nOutboundAttempted',
		'nOutboundConnected',
		'nOutboundAbandoned',
		'nError',
		'oServiceTarget',
		'oServiceLevel',
		'tActive',
		'tInactive',
		'oActiveUsers',
		'oMemberUsers',
		'oActiveQueues',
		'oMemberQueues',
		'oInteracting',
		'oWaiting',
		'oOnQueueUsers',
		'oOffQueueUsers',
		'oUserPresences',
		'oUserRoutingStatuses'
	].sort(),
	groupBy: [
		'conversationId',
		'sessionId',
		'mediaType',
		'queueId',
		'userId',
		'participantId',
		'participantName',
		'direction',
		'wrapUpCode',
		'wrapUpNote',
		'interactionType',
		'requestedRoutingSkillId',
		'requestedLanguageId',
		'purpose',
		'participantType',
		'segmentType',
		'disconnectType',
		'errorCode',
		'conversationEnd',
		'segmentEnd',
		'externalContactId',
		'externalOrganizationId',
		'stationId',
		'edgeId',
		'dnis',
		'ani',
		'outboundCampaignId',
		'outboundContactId',
		'outboundContactListId',
		'monitoredParticipantId',
		'sourceSessionId',
		'destinationSessionId',
		'sourceConversationId',
		'destinationConversationId',
		'remoteNameDisplayable',
		'sipResponseCode',
		'q850ResponseCode',
		'conference',
		'groupId',
		'roomId',
		'addressFrom',
		'addressTo',
		'subject',
		'peerId',
		'scriptId',
		'evaluationId',
		'evaluatorId',
		'contextId',
		'formId',
		'formName',
		'eventTime',
		'systemPresence',
		'organizationPresenceId',
		'routingStatus'
	].sort(),
	flowAggregate: {
		metrics: [
			"nFlow",
			"nFlowOutcome",
			"nFlowOutcomeFailed",
			"oFlow",
			"tFlow",
			"tFlowDisconnect",
			"tFlowExit",
			"tFlowOutcome"
		  ],
		groupBy: [
			"addressFrom",
			"addressTo",
			"agentScore",
			"ani",
			"conversationId",
			"convertedFrom",
			"convertedTo",
			"direction",
			"disconnectType",
			"divisionId",
			"dnis",
			"edgeId",
			"endingLanguage",
			"entryReason",
			"entryType",
			"exitReason",
			"externalMediaCount",
			"externalOrganizationId",
			"flaggedReason",
			"flowId",
			"flowName",
			"flowOutType",
			"flowOutcome",
			"flowOutcomeId",
			"flowOutcomeValue",
			"flowType",
			"flowVersion",
			"groupId",
			"interactionType",
			"journeyActionId",
			"journeyActionMapId",
			"journeyActionMapVersion",
			"journeyCustomerId",
			"journeyCustomerIdType",
			"journeyCustomerSessionId",
			"journeyCustomerSessionIdType",
			"mediaCount",
			"mediaType",
			"messageType",
			"originatingDirection",
			"outboundCampaignId",
			"outboundContactId",
			"outboundContactListId",
			"participantName",
			"peerId",
			"provider",
			"purpose",
			"queueId",
			"remote",
			"requestedLanguageId",
			"requestedRoutingSkillId",
			"roomId",
			"routingPriority",
			"scoredAgentId",
			"sessionDnis",
			"sessionId",
			"startingLanguage",
			"stationId",
			"teamId",
			"transferTargetAddress",
			"transferTargetName",
			"transferType",
			"userId",
			"wrapUpCode"
		  ]
	},
	flowObservation: {
		metrics: ["oFlow"],
		dimensions: []
	},
	conversationAggregate: {
		metrics: [
			"nBlindTransferred",
			"nConnected",
			"nConsult",
			"nConsultTransferred",
			"nError",
			"nOffered",
			"nOutbound",
			"nOutboundAbandoned",
			"nOutboundAttempted",
			"nOutboundConnected",
			"nOverSla",
			"nStateTransitionError",
			"nTransferred",
			"oExternalMediaCount",
			"oInteracting",
			"oMediaCount",
			"oServiceLevel",
			"oServiceTarget",
			"oWaiting",
			"tAbandon",
			"tAcd",
			"tAcw",
			"tAgentResponseTime",
			"tAlert",
			"tAnswered",
			"tContacting",
			"tDialing",
			"tFlowOut",
			"tHandle",
			"tHeld",
			"tHeldComplete",
			"tIvr",
			"tMonitoring",
			"tNotResponding",
			"tShortAbandon",
			"tTalk",
			"tTalkComplete",
			"tUserResponseTime",
			"tVoicemail",
			"tWait"
		  ],
		groupBy: [
			"addressFrom",
			"addressTo",
			"agentScore",
			"ani",
			"conversationId",
			"convertedFrom",
			"convertedTo",
			"direction",
			"disconnectType",
			"divisionId",
			"dnis",
			"edgeId",
			"externalMediaCount",
			"externalOrganizationId",
			"flaggedReason",
			"flowOutType",
			"groupId",
			"interactionType",
			"journeyActionId",
			"journeyActionMapId",
			"journeyActionMapVersion",
			"journeyCustomerId",
			"journeyCustomerIdType",
			"journeyCustomerSessionId",
			"journeyCustomerSessionIdType",
			"mediaCount",
			"mediaType",
			"messageType",
			"originatingDirection",
			"outboundCampaignId",
			"outboundContactId",
			"outboundContactListId",
			"participantName",
			"peerId",
			"provider",
			"purpose",
			"queueId",
			"remote",
			"requestedLanguageId",
			"requestedRoutingSkillId",
			"roomId",
			"routingPriority",
			"scoredAgentId",
			"sessionDnis",
			"sessionId",
			"stationId",
			"teamId",
			"userId",
			"wrapUpCode"
		  ]
	},
	queueObservation: {
		metrics: [
			"oActiveUsers",
			"oInteracting",
			"oMemberUsers",
			"oOffQueueUsers",
			"oOnQueueUsers",
			"oUserPresences",
			"oUserRoutingStatuses",
			"oWaiting"
		  ]
	},

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

			// console.dir(swagger, {depth: null});

			/*
			All of these requests have been failing in production due to the swagger file differing from the local file
			As such they would always result in using the default values
			After updating the local file to match the current (5/5/20) swagger file, I have commented these lines out
			*/

			// TODO: Add custom metrics and group by for each query

			// var dimensions = swagger.definitions.AnalyticsQueryPredicate.properties.dimension.enum;
			// this.dimensions.clear();
			// this.dimensions.pushObjects(dimensions.sort());

			// var metrics = swagger.definitions.AnalyticsQueryPredicate.properties.metric.enum;
			// this.metrics.clear();
			// this.metrics.pushObjects(metrics.sort());

			// var groupBys = swagger.definitions.AggregationQuery.properties.groupBy.items.enum;
			// this.groupBy.clear();
			// this.groupBy.pushObjects(groupBys.sort());

			var flowAggregateMetrics = swagger.definitions.FlowAggregationQuery.properties.metrics.items.enum;
			this.flowAggregate.metrics.clear();
			this.flowAggregate.metrics.pushObjects(flowAggregateMetrics.sort());

			var flowAggregateGroupBy = swagger.definitions.FlowAggregationQuery.properties.groupBy.items.enum;
			this.flowAggregate.groupBy.clear();
			this.flowAggregate.groupBy.pushObjects(flowAggregateGroupBy.sort());

			var flowObservationMetrics = swagger.definitions.FlowObservationQuery.properties.metrics.items.enum;
			this.flowObservation.metrics.clear();
			this.flowObservation.metrics.pushObjects(flowObservationMetrics.sort());

			var flowObservationDimensions = swagger.definitions.FlowObservationQueryPredicate.properties.dimension.enum;
			this.flowObservation.dimensions.clear();
			this.flowObservation.dimensions.pushObjects(flowObservationDimensions.sort());

			var conversationAggregateMetrics = swagger.definitions.ConversationAggregationQuery.properties.metrics.items.enum;
			this.conversationAggregate.metrics.clear();
			this.conversationAggregate.metrics.pushObjects(conversationAggregateMetrics.sort());

			var conversationAggregateGroupBy = swagger.definitions.ConversationAggregationQuery.properties.groupBy.items.enum;
			this.conversationAggregate.groupBy.clear();
			this.conversationAggregate.groupBy.pushObjects(conversationAggregateGroupBy.sort());

			var queueObservationMetrics = swagger.definitions.QueueObservationQuery.properties.metrics.items.enum;
			this.queueObservation.metrics.clear();
			this.queueObservation.metrics.pushObjects(queueObservationMetrics.sort());

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
