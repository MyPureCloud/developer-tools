class Fallbacks {
    constructor() {
        this.dimensions = [
            "conversationId",
            "sessionId",
            "mediaType",
            "queueId",
            "userId",
            "participantId",
            "participantName",
            "direction",
            "wrapUpCode",
            "wrapUpNote",
            "interactionType",
            "requestedRoutingSkillId",
            "requestedLanguageId",
            "purpose",
            "participantType",
            "segmentType",
            "disconnectType",
            "errorCode",
            "conversationEnd",
            "segmentEnd",
            "externalContactId",
            "externalOrganizationId",
            "stationId",
            "edgeId",
            "dnis",
            "ani",
            "outboundCampaignId",
            "outboundContactId",
            "outboundContactListId",
            "monitoredParticipantId",
            "sourceSessionId",
            "destinationSessionId",
            "sourceConversationId",
            "destinationConversationId",
            "remoteNameDisplayable",
            "sipResponseCode",
            "q850ResponseCode",
            "conference",
            "groupId",
            "roomId",
            "addressFrom",
            "addressTo",
            "subject",
            "peerId",
            "scriptId",
            "evaluationId",
            "evaluatorId",
            "contextId",
            "formId",
            "formName",
            "eventTime",
            "systemPresence",
            "organizationPresenceId",
            "routingStatus"
        ].sort()
        this.metrics = [
            "tSegmentDuration",
            "tConversationDuration",
            "oTotalCriticalScore",
            "oTotalScore",
            "nEvaluations",
            "tAbandon",
            "tIvr",
            "tAnswered",
            "tAcd",
            "tTalk",
            "tHeld",
            "tTalkComplete",
            "tHeldComplete",
            "tAcw",
            "tHandle",
            "tWait",
            "tAgentRoutingStatus",
            "tOrganizationPresence",
            "tSystemPresence",
            "tUserResponseTime",
            "tAgentResponseTime",
            "nOffered",
            "nOverSla",
            "nTransferred",
            "nOutboundAttempted",
            "nOutboundConnected",
            "nOutboundAbandoned",
            "nError",
            "oServiceTarget",
            "oServiceLevel",
            "tActive",
            "tInactive",
            "oActiveUsers",
            "oMemberUsers",
            "oActiveQueues",
            "oMemberQueues",
            "oInteracting",
            "oWaiting",
            "oOnQueueUsers",
            "oOffQueueUsers",
            "oUserPresences",
            "oUserRoutingStatuses"
        ].sort()
        this.detailMetrics = [
        "tSegmentDuration",
        "tConversationDuration",
        "oTotalCriticalScore",
        "oTotalScore",
        "nEvaluations",
        "tAbandon",
        "tIvr",
        "tAnswered",
        "tAcd",
        "tTalk",
        "tHeld",
        "tTalkComplete",
        "tHeldComplete",
        "tAcw",
        "tHandle",
        "tWait",
        "tAgentRoutingStatus",
        "tOrganizationPresence",
        "tSystemPresence",
        "tUserResponseTime",
        "tAgentResponseTime",
        "nOffered",
        "nOverSla",
        "nTransferred",
        "nOutboundAttempted",
        "nOutboundConnected",
        "nOutboundAbandoned",
        "nError",
        "oServiceTarget",
        "oServiceLevel",
        "tActive",
        "tInactive",
        "oActiveUsers",
        "oMemberUsers",
        "oActiveQueues",
        "oMemberQueues",
        "oInteracting",
        "oWaiting",
        "oOnQueueUsers",
        "oOffQueueUsers",
        "oUserPresences",
        "oUserRoutingStatuses"]

        this.groupBy = [
            "conversationId",
            "sessionId",
            "mediaType",
            "queueId",
            "userId",
            "participantId",
            "participantName",
            "direction",
            "wrapUpCode",
            "wrapUpNote",
            "interactionType",
            "requestedRoutingSkillId",
            "requestedLanguageId",
            "purpose",
            "participantType",
            "segmentType",
            "disconnectType",
            "errorCode",
            "conversationEnd",
            "segmentEnd",
            "externalContactId",
            "externalOrganizationId",
            "stationId",
            "edgeId",
            "dnis",
            "ani",
            "outboundCampaignId",
            "outboundContactId",
            "outboundContactListId",
            "monitoredParticipantId",
            "sourceSessionId",
            "destinationSessionId",
            "sourceConversationId",
            "destinationConversationId",
            "remoteNameDisplayable",
            "sipResponseCode",
            "q850ResponseCode",
            "conference",
            "groupId",
            "roomId",
            "addressFrom",
            "addressTo",
            "subject",
            "peerId",
            "scriptId",
            "evaluationId",
            "evaluatorId",
            "contextId",
            "formId",
            "formName",
            "eventTime",
            "systemPresence",
            "organizationPresenceId",
            "routingStatus"
        ].sort()
        this.flowAggregate = {
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
                "externalContactId",
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
        }
        this.flowAggregateFilter = {
            dimensions: [
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
                "externalContactId",
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
        }
        this.flowAggregateView = {
            metrics: [
                "nFlow",
                "nFlowOutcome",
                "nFlowOutcomeFailed",
                "oFlow",
                "tFlow",
                "tFlowDisconnect",
                "tFlowExit",
                "tFlowOutcome"
            ]
        }
        this.flowObservation = {
            metrics: ["oFlow"],
            dimensions: [
                "flowId",
                "mediaType"
            ],
            detailMetrics: ["oFlow"]
        }
        this.conversationAggregate = {
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
        }
        this.conversationAggregateFilter = {
            dimensions: [
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
                "externalContactId",
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
        }
        this.conversationAggregateView = {
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
            ]
        }
        this.queueObservation = {
            metrics: [
                "oActiveUsers",
                "oInteracting",
                "oMemberUsers",
                "oOffQueueUsers",
                "oOnQueueUsers",
                "oUserPresences",
                "oUserRoutingStatuses",
                "oWaiting"
            ],
            dimensions: [
                "mediaType",
                "queueId"
            ],
            detailMetrics: [
                "oActiveUsers",
                "oInteracting",
                "oMemberUsers",
                "oOffQueueUsers",
                "oOnQueueUsers",
                "oUserPresences",
                "oUserRoutingStatuses",
                "oWaiting"
            ]
        }
        this.userAggregate = {
            metrics: [
                "tAgentRoutingStatus",
                "tOrganizationPresence",
                "tSystemPresence"
            ],
            groupBy: [
                "organizationPresenceId",
                "routingStatus",
                "systemPresence",
                "userId"
            ]
        }
        this.userAggregateFilter = {
            dimensions: [
                "userId"
            ]
        }
        this.userObservation = {
            metrics: [
                "oActiveQueues",
                "oMemberQueues"
            ],
            dimensions: [
                "userId",
            ],
            detailMetrics: [
                "oActiveQueues",
                "oMemberQueues"
            ]
        }
        this.conversationDetailConversationFilter = {
            metrics: [
                "nBlindTransferred",
                "nConnected",
                "nConsult",
                "nConsultTransferred",
                "nError",
                "nFlow",
                "nFlowOutcome",
                "nFlowOutcomeFailed",
                "nOffered",
                "nOutbound",
                "nOutboundAbandoned",
                "nOutboundAttempted",
                "nOutboundConnected",
                "nOverSla",
                "nStateTransitionError",
                "nTransferred",
                "oExternalMediaCount",
                "oMediaCount",
                "tAbandon",
                "tAcd",
                "tAcw",
                "tAgentResponseTime",
                "tAlert",
                "tAnswered",
                "tContacting",
                "tConversationDuration",
                "tDialing",
                "tFlow",
                "tFlowDisconnect",
                "tFlowExit",
                "tFlowOut",
                "tFlowOutcome",
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
                "tVoicemail"
            ],
            dimensions: [
                "conversationEnd",
                "conversationId",
                "divisionId",
                "mediaStatsMinConversationMos",
                "mediaStatsMinConversationRFactor",
                "originatingDirection"
            ]
        }
        this.conversationDetailEvaluationFilter = {
            metrics: [
                "oTotalCriticalScore",
                "oTotalScore"
            ],
            dimensions: [
                "calibrationId",
                "contextId",
                "deleted",
                "evaluationId",
                "evaluatorId",
                "eventTime",
                "formId",
                "formName",
                "queueId",
                "rescored",
                "userId"
            ]
        }
        this.conversationDetailSurveyFilter = {
            metrics: [
                "oSurveyTotalScore"
            ],
            dimensions: [
                "eventTime",
                "queueId",
                "surveyCompletedDate",
                "surveyFormContextId",
                "surveyFormId",
                "surveyFormName",
                "surveyId",
                "surveyPromoterScore",
                "surveyStatus",
                "userId"
            ]
        }
        this.conversationDetailSegmentFilter = {
            metrics: [
                "tSegmentDuration"
            ],
            dimensions: [
                "addressFrom",
                "addressOther",
                "addressSelf",
                "addressTo",
                "agentScore",
                "ani",
                "audioMuted",
                "callbackNumber",
                "callbackScheduledTime",
                "callbackUserName",
                "cobrowseRole",
                "cobrowseRoomId",
                "conference",
                "destinationConversationId",
                "destinationSessionId",
                "direction",
                "disconnectType",
                "dispositionAnalyzer",
                "dispositionName",
                "dnis",
                "edgeId",
                "endingLanguage",
                "entryReason",
                "entryType",
                "errorCode",
                "exitReason",
                "externalContactId",
                "externalOrganizationId",
                "flaggedReason",
                "flowId",
                "flowName",
                "flowOutType",
                "flowOutcome",
                "flowOutcomeEndTimestamp",
                "flowOutcomeId",
                "flowOutcomeStartTimestamp",
                "flowOutcomeValue",
                "flowType",
                "flowVersion",
                "groupId",
                "issuedCallback",
                "journeyActionId",
                "journeyActionMapId",
                "journeyActionMapVersion",
                "journeyCustomerId",
                "journeyCustomerIdType",
                "journeyCustomerSessionId",
                "journeyCustomerSessionIdType",
                "mediaBridgeId",
                "mediaCount",
                "mediaType",
                "messageType",
                "monitoredParticipantId",
                "outboundCampaignId",
                "outboundContactId",
                "outboundContactListId",
                "participantId",
                "participantName",
                "peerId",
                "protocolCallId",
                "provider",
                "purpose",
                "q850ResponseCode",
                "queueId",
                "recording",
                "remote",
                "remoteNameDisplayable",
                "requestedLanguageId",
                "requestedRoutingSkillId",
                "requestedRoutingUserId",
                "roomId",
                "scoredAgentId",
                "screenShareAddressSelf",
                "screenShareRoomId",
                "scriptId",
                "segmentEnd",
                "segmentType",
                "sessionDnis",
                "sessionId",
                "sharingScreen",
                "sipResponseCode",
                "skipEnabled",
                "sourceConversationId",
                "sourceSessionId",
                "startingLanguage",
                "subject",
                "teamId",
                "timeoutSeconds",
                "transferTargetAddress",
                "transferTargetName",
                "transferType",
                "userId",
                "videoAddressSelf",
                "videoMuted",
                "videoRoomId",
                "wrapUpCode",
                "wrapUpNote",
                "wrapUpTag"
            ]
        }
    }
};

export default new Fallbacks();