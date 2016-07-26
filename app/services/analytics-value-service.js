import Ember from 'ember';
var observer = Ember.observer;

export default Ember.Component.extend({
    dimensions:["", "conversationId", "sessionId", "mediaType", "queueId", "userId", "participantId", "participantName", "direction", "wrapUpCode", "wrapUpNote", "interactionType", "requestedRoutingSkillId", "requestedLanguageId", "purpose", "participantType", "segmentType", "disconnectType", "errorCode", "stationId", "edgeId", "dnis", "ani", "outboundCampaignId", "outboundContactId", "outboundContactListId", "monitoredParticipantId", "sourceSessionId", "destinationSessionId", "sourceConversationId", "destinationConversationId", "remoteNameDisplayable", "sipResponseCode", "q850ResponseCode", "conference", "groupId", "roomId", "addressFrom", "addressTo", "peerId", "scriptId", "evaluationId", "evaluatorId", "contextId", "formId", "formName", "eventTime"].sort(),
    propertyTypes:["", "bool", "integer", "real", "date", "string", "uuid"].sort(),
    metrics:[ "tSegmentDuration", "oTotalCriticalScore", "oTotalScore", "nEvaluations", "tAbandon", "tIvr", "tAnswered", "tAcd", "tTalk", "tHeld", "tTalkComplete", "tHeldComplete", "tAcw", "tHandle", "tWait", "tAgentRoutingStatus", "tOrganizationPresence", "tSystemPresence", "tUserResponseTime", "tAgentResponseTime", "nOffered", "nOverSla", "nTransferred", "nOutboundAttempted", "nOutboundConnected", "nOutboundAbandoned", "nError", "oServiceTarget", "oServiceLevel", "tActive", "tInactive", "oActiveUsers", "oMemberUsers", "oActiveQueues", "oMemberQueues", "oInteracting", "oWaiting", "oOnQueueUsers", "oOffQueueUsers"].sort(),
    operators:["matches", "exists", "notExists"],
    mediaTypes:["voice", "chat", "email", "callback"].sort(),
    groupBy:["conversationId", "sessionId", "mediaType", "queueId", "userId", "participantId", "participantName", "direction", "wrapUpCode", "wrapUpNote", "interactionType", "requestedRoutingSkillId", "requestedLanguageId", "purpose", "participantType", "segmentType", "disconnectType", "errorCode", "stationId", "edgeId", "dnis", "ani", "outboundCampaignId", "outboundContactId", "outboundContactListId", "monitoredParticipantId", "sourceSessionId", "destinationSessionId", "sourceConversationId", "destinationConversationId", "remoteNameDisplayable", "sipResponseCode", "q850ResponseCode", "conference", "groupId", "roomId", "addressFrom", "addressTo", "peerId", "scriptId", "evaluationId", "evaluatorId", "contextId", "formId", "formName", "eventTime"].sort(),
    filteredMetrics: function(filter){
        var patt = new RegExp(filter);

        return this.get('metrics').filter(function(item){
            return patt.test(item);
          });
    }
});
