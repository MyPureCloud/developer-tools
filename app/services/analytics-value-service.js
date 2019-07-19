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
	metrics: ['tSegmentDuration'].sort(),
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

	propertyTypes: ['', 'bool', 'integer', 'real', 'date', 'string', 'uuid'].sort(),
	operators: ['matches', 'exists', 'notExists'],
	numericRangeOperators: ['lt', 'lte', 'gt', 'gte'],
	mediaTypes: ['', 'voice', 'chat', 'email', 'callback', 'screenshare', 'cobrowse'].sort(),
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

			var dimensions = swagger.definitions.AnalyticsQueryPredicate.properties.dimension.enum;
			this.dimensions.clear();
			this.dimensions.pushObjects(dimensions.sort());

			var metrics = swagger.definitions.AnalyticsQueryPredicate.properties.metric.enum;
			this.metrics.clear();
			this.metrics.pushObjects(metrics.sort());

			var groupBys = swagger.definitions.AggregationQuery.properties.groupBy.items.enum;
			this.groupBy.clear();
			this.groupBy.pushObjects(groupBys.sort());
		} catch (err) {
			console.log(err);
		}
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
