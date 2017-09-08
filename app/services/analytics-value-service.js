import Ember from 'ember';

export default Ember.Service.extend({
    dimensions:[ "", "conversationId", "sessionId", "mediaType", "queueId", "userId", "participantId", "participantName", "direction", "wrapUpCode", "wrapUpNote", "interactionType", "requestedRoutingSkillId", "requestedLanguageId", "purpose", "participantType", "segmentType", "disconnectType", "errorCode", "conversationEnd", "segmentEnd", "externalContactId", "externalOrganizationId", "stationId", "edgeId", "dnis", "ani", "outboundCampaignId", "outboundContactId", "outboundContactListId", "monitoredParticipantId", "sourceSessionId", "destinationSessionId", "sourceConversationId", "destinationConversationId", "remoteNameDisplayable", "sipResponseCode", "q850ResponseCode", "conference", "groupId", "roomId", "addressFrom", "addressTo", "subject", "peerId", "scriptId", "evaluationId", "evaluatorId", "contextId", "formId", "formName", "eventTime", "systemPresence", "organizationPresenceId", "routingStatus" ].sort(),
    propertyTypes:["", "bool", "integer", "real", "date", "string", "uuid"].sort(),
    metrics:[ "tSegmentDuration", "tConversationDuration", "oTotalCriticalScore", "oTotalScore", "nEvaluations", "tAbandon", "tIvr", "tAnswered", "tAcd", "tTalk", "tHeld", "tTalkComplete", "tHeldComplete", "tAcw", "tHandle", "tWait", "tAgentRoutingStatus", "tOrganizationPresence", "tSystemPresence", "tUserResponseTime", "tAgentResponseTime", "nOffered", "nOverSla", "nTransferred", "nOutboundAttempted", "nOutboundConnected", "nOutboundAbandoned", "nError", "oServiceTarget", "oServiceLevel", "tActive", "tInactive", "oActiveUsers", "oMemberUsers", "oActiveQueues", "oMemberQueues", "oInteracting", "oWaiting", "oOnQueueUsers", "oOffQueueUsers", "oUserPresences", "oUserRoutingStatuses" ].sort(),
    operators:["matches", "exists", "notExists"],
    mediaTypes:["", "voice", "chat", "email", "callback", "screenshare", "cobrowse"].sort(),
    groupBy:[ "conversationId", "sessionId", "mediaType", "queueId", "userId", "participantId", "participantName", "direction", "wrapUpCode", "wrapUpNote", "interactionType", "requestedRoutingSkillId", "requestedLanguageId", "purpose", "participantType", "segmentType", "disconnectType", "errorCode", "conversationEnd", "segmentEnd", "externalContactId", "externalOrganizationId", "stationId", "edgeId", "dnis", "ani", "outboundCampaignId", "outboundContactId", "outboundContactListId", "monitoredParticipantId", "sourceSessionId", "destinationSessionId", "sourceConversationId", "destinationConversationId", "remoteNameDisplayable", "sipResponseCode", "q850ResponseCode", "conference", "groupId", "roomId", "addressFrom", "addressTo", "subject", "peerId", "scriptId", "evaluationId", "evaluatorId", "contextId", "formId", "formName", "eventTime", "systemPresence", "organizationPresenceId", "routingStatus" ].sort(),
    aggregationTypes:['termFrequency', 'numericRange'],
    filteredMetrics: function(filter){
        var patt = new RegExp(filter);

        return this.get('metrics').filter(function(item){
            return patt.test(item);
          });
    }
});
