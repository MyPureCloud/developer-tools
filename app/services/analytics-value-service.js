/*global $*/
import Ember from 'ember';

export default Ember.Service.extend({
  // dimensions, metrics, and groupBy will be overwritten, but leaving some initial values as a fallback
  dimensions:[ "", "conversationId", "sessionId", "mediaType", "queueId", "userId", "participantId", "participantName", "direction", "wrapUpCode", "wrapUpNote", "interactionType", "requestedRoutingSkillId", "requestedLanguageId", "purpose", "participantType", "segmentType", "disconnectType", "errorCode", "conversationEnd", "segmentEnd", "externalContactId", "externalOrganizationId", "stationId", "edgeId", "dnis", "ani", "outboundCampaignId", "outboundContactId", "outboundContactListId", "monitoredParticipantId", "sourceSessionId", "destinationSessionId", "sourceConversationId", "destinationConversationId", "remoteNameDisplayable", "sipResponseCode", "q850ResponseCode", "conference", "groupId", "roomId", "addressFrom", "addressTo", "subject", "peerId", "scriptId", "evaluationId", "evaluatorId", "contextId", "formId", "formName", "eventTime", "systemPresence", "organizationPresenceId", "routingStatus" ].sort(),
  metrics:[ "tSegmentDuration", "tConversationDuration", "oTotalCriticalScore", "oTotalScore", "nEvaluations", "tAbandon", "tIvr", "tAnswered", "tAcd", "tTalk", "tHeld", "tTalkComplete", "tHeldComplete", "tAcw", "tHandle", "tWait", "tAgentRoutingStatus", "tOrganizationPresence", "tSystemPresence", "tUserResponseTime", "tAgentResponseTime", "nOffered", "nOverSla", "nTransferred", "nOutboundAttempted", "nOutboundConnected", "nOutboundAbandoned", "nError", "oServiceTarget", "oServiceLevel", "tActive", "tInactive", "oActiveUsers", "oMemberUsers", "oActiveQueues", "oMemberQueues", "oInteracting", "oWaiting", "oOnQueueUsers", "oOffQueueUsers", "oUserPresences", "oUserRoutingStatuses" ].sort(),
  groupBy:[ "conversationId", "sessionId", "mediaType", "queueId", "userId", "participantId", "participantName", "direction", "wrapUpCode", "wrapUpNote", "interactionType", "requestedRoutingSkillId", "requestedLanguageId", "purpose", "participantType", "segmentType", "disconnectType", "errorCode", "conversationEnd", "segmentEnd", "externalContactId", "externalOrganizationId", "stationId", "edgeId", "dnis", "ani", "outboundCampaignId", "outboundContactId", "outboundContactListId", "monitoredParticipantId", "sourceSessionId", "destinationSessionId", "sourceConversationId", "destinationConversationId", "remoteNameDisplayable", "sipResponseCode", "q850ResponseCode", "conference", "groupId", "roomId", "addressFrom", "addressTo", "subject", "peerId", "scriptId", "evaluationId", "evaluatorId", "contextId", "formId", "formName", "eventTime", "systemPresence", "organizationPresenceId", "routingStatus" ].sort(),
  
  propertyTypes:["", "bool", "integer", "real", "date", "string", "uuid"].sort(),
  operators:["matches", "exists", "notExists"],
  mediaTypes:["", "voice", "chat", "email", "callback", "screenshare", "cobrowse"].sort(),
  aggregationTypes:['termFrequency', 'numericRange'],
  filteredMetrics: function(filter){
    var patt = new RegExp(filter);

    return this.get('metrics').filter(function(item){
      return patt.test(item);
    });
  },
  init() {
    let that = this;
    var swaggerUrl = '/swagger-schema/publicapi-v2-latest.json';
    $.getJSON({
      url: swaggerUrl,
      xhrFields: {
        withCredentials: true
      }
    }).done(function(swagger){
        var dimensions = swagger.definitions.AnalyticsQueryPredicate.properties.dimension.enum;
        dimensions.push('');
        that.dimensions.clear();
        that.dimensions.pushObjects(dimensions.sort());

        var metrics = swagger.definitions.AnalyticsQueryPredicate.properties.metric.enum;
        metrics.push('');
        that.metrics.clear();
        that.metrics.pushObjects(metrics.sort());

        var groupBys = swagger.definitions.AggregationQuery.properties.groupBy.items.enum;
        that.groupBy.clear();
        that.groupBy.pushObjects(groupBys.sort());
      })
      .fail(function(err) {
        console.error(err);
      });
  }
});
