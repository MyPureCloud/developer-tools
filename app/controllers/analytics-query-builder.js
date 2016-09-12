import Ember from 'ember';
var  computed = Ember.computed;

export default Ember.Controller.extend({
    purecloud: Ember.inject.service('purecloud'),
    queryType: 'conversation_detail',
    queryTypes:[
        {
            name: "Conversation Detail Query",
            id:"conversation_detail",
            url:"/api/v2/analytics/conversations/details/query"
        },
        {
            name: "Conversation Aggregate Query",
            id:"conversation_aggregate",
            url:"/api/v2/analytics/conversations/aggregates/query"
        },
        {
            name: "User Observation Query",
            id:"user_observation",
            url:"/api/v2/analytics/users/observations/query"
        },
        {
            name: "Queue Observation Query",
            id:"queue_observation",
            url:"/api/v2/analytics/queues/observations/query"
        }

    ],
    query:{},
    url: computed('queryType', function() {
       let type = this.get('queryType');
       for(let x=0; x< this.queryTypes.length; x++){
           if(this.queryTypes[x].id === type){
               return this.queryTypes[x].url;
           }
       }
    }),
    queryJson:JSON.stringify({
 "interval": "2016-09-05T15:07:36.671Z/2016-09-12T15:07:36.676Z",
 "order": "asc",
 "orderBy": "conversationStart",
 "paging": {
  "pageSize": 25,
  "pageNumber": 1
 },
 "segmentFilters": [
  {
   "type": "or",
   "clauses": [
    {
     "type": "or",
     "predicates": [
      {
       "type": "dimension",
       "dimension": "addressTo",
       "operator": "matches",
       "value": "2323"
      }
     ]
    }
   ]
  }
 ]
}, null, "  "),
    queryResult:JSON.stringify({
  "conversations": [
    {
      "conversationId": "5773eca4-0874-4617-a6e8-85591aa94609",
      "conversationStart": "2016-09-05T11:50:49.582Z",
      "participants": [
        {
          "participantId": "2814f688-d869-44ba-b1f7-e1b129ec3aaa",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "7cd3b0d0-282e-4492-8e42-0792120f8799",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-05T11:50:49.582Z",
                  "segmentEnd": "2016-09-05T11:50:51.649Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "80777d87-5b68-4142-a3ca-25dcf0b2077f",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "4b3d69e5-f7a4-489a-a523-7644ae28cf9b",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-05T11:50:49.582Z",
                  "segmentEnd": "2016-09-06T00:12:12.350Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "ab9e413f-33d6-461a-9e9b-e10cf13d3977",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "7a57130a-a58d-4291-91fe-0aac98b8f05a",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-05T11:50:49.871Z",
                  "segmentEnd": "2016-09-05T11:50:51.651Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-05T11:50:51.651Z",
                  "segmentEnd": "2016-09-06T00:12:12.347Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T00:12:12.232Z",
                  "segmentEnd": "2016-09-06T00:12:12.232Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "25c4a260-d72b-4c47-969d-b93fc21294ae",
      "conversationStart": "2016-09-06T00:12:22.359Z",
      "participants": [
        {
          "participantId": "311e5afe-fb13-476a-8dc3-04520e730ee8",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "adb1b6d2-a855-4b95-8281-f5a0395f21a9",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "a0c6b69f4491892b5d2f2687373d8140",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:22.359Z",
                  "segmentEnd": "2016-09-06T00:12:31.296Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "d9aea45b-bd78-48b9-ad08-97c7b09c1581",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "ee28d296-748a-40a3-84b3-4124da001575",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "a0c6b69f4491892b5d2f2687373d8140",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:22.359Z",
                  "segmentEnd": "2016-09-06T00:12:29.207Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "479b9e97-7eae-4f3f-adf3-d5e1afae9f61",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "b9f709dd-4100-423c-b7a3-c866d044e891",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "a0c6b69f4491892b5d2f2687373d8140",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:22.620Z",
                  "segmentEnd": "2016-09-06T00:12:29.209Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T00:12:29.209Z",
                  "segmentEnd": "2016-09-06T00:12:31.293Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T00:12:31.296Z",
                  "segmentEnd": "2016-09-06T00:12:31.296Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "d82de18e-21ff-41a3-8986-cf8cd1dd5a61",
      "conversationStart": "2016-09-06T00:12:31.693Z",
      "participants": [
        {
          "participantId": "e2cb3695-1979-4364-bfd1-1d9c5907aa7e",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "64aa87eb-4d20-4f95-a03c-f54d3a64ea4e",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "487004b85eff7439a29bf7ff3da40d51",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:31.693Z",
                  "segmentEnd": "2016-09-06T00:12:33.316Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "29dca7c5-66f6-4183-baeb-04a7da2ed013",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "d23de1b3-95fe-4df3-8c17-7fdcbada9a39",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "487004b85eff7439a29bf7ff3da40d51",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:31.693Z",
                  "segmentEnd": "2016-09-06T00:12:35.153Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "7b4cbcbc-5046-4af7-9c80-1b358ee8c6b7",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "0af7b693-31b0-4d66-b169-a5f5ee8ea7e3",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "487004b85eff7439a29bf7ff3da40d51",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:31.989Z",
                  "segmentEnd": "2016-09-06T00:12:33.318Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T00:12:33.318Z",
                  "segmentEnd": "2016-09-06T00:12:35.150Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T00:12:35.080Z",
                  "segmentEnd": "2016-09-06T00:12:35.080Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "b2c2a1f2-187c-4aca-a3c8-dca611679805",
      "conversationStart": "2016-09-06T00:12:35.704Z",
      "participants": [
        {
          "participantId": "adc5b408-ae55-4747-9768-2f7012d1e111",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "5408d138-710d-428b-ad5e-cd8525bd9492",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "d5133e677423a8069767bfb4c3e37707",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:35.704Z",
                  "segmentEnd": "2016-09-06T00:12:38.717Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "1185c0e5-21ef-40de-9fee-96d8867c0959",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "82ed5432-eaa4-4dea-9e84-84934395c050",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "d5133e677423a8069767bfb4c3e37707",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:35.704Z",
                  "segmentEnd": "2016-09-06T00:12:37.092Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "10405209-c637-4b73-baf0-76a9ebb60df5",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "5369676a-e12e-43e6-9012-220d2c3ab85d",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "d5133e677423a8069767bfb4c3e37707",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:36.004Z",
                  "segmentEnd": "2016-09-06T00:12:37.097Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T00:12:37.097Z",
                  "segmentEnd": "2016-09-06T00:12:38.716Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T00:12:38.724Z",
                  "segmentEnd": "2016-09-06T00:12:38.724Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "275b360e-23d2-4e21-a981-788796ba98ba",
      "conversationStart": "2016-09-06T00:12:39.151Z",
      "participants": [
        {
          "participantId": "69e3f450-cf7e-4630-9bfa-5c6d33ad7a6d",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "c689cf48-a3d8-4ab7-a937-6895e224e0ec",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "768393cef69b3152510613e09c7ff2d4",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:39.151Z",
                  "segmentEnd": "2016-09-06T00:12:42.055Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "60e87ec8-00aa-46ad-81e2-6743003b671d",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "dda62b1b-7672-4f41-868a-b4c43fac370c",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "768393cef69b3152510613e09c7ff2d4",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:39.151Z",
                  "segmentEnd": "2016-09-06T00:12:40.588Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "b92569a4-0c8a-4235-a772-65d56a8a0091",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "a5a5e862-81c5-4bc1-9398-0bc8d0d4f3e3",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "768393cef69b3152510613e09c7ff2d4",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:12:39.418Z",
                  "segmentEnd": "2016-09-06T00:12:40.590Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T00:12:40.590Z",
                  "segmentEnd": "2016-09-06T00:12:42.046Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T00:12:42.004Z",
                  "segmentEnd": "2016-09-06T00:12:42.004Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "0b72885e-a925-42e8-89e0-26e50ae082b0",
      "conversationStart": "2016-09-06T00:15:01.955Z",
      "participants": [
        {
          "participantId": "c9d2b6b0-871c-46fb-b89d-a9829aff6feb",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "9f433462-56d3-4fc5-a4db-fe27940e9bfc",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:15:01.955Z",
                  "segmentEnd": "2016-09-06T00:15:31.105Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "660ef70b-5126-498b-9b9f-1ce79939e523",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "9da17097-f2e9-479b-a0fe-5614a351a0d3",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:15:01.955Z",
                  "segmentEnd": "2016-09-06T00:15:19.447Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "4b3c7af1-3c25-4f84-bb97-77f90336aa91",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "d6197453-e3fb-4596-b2e6-bbf80aa77759",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:15:02.465Z",
                  "segmentEnd": "2016-09-06T00:15:09.735Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "system",
                  "segmentType": "alert"
                }
              ]
            }
          ]
        },
        {
          "participantId": "7126f57d-111d-4fab-b1e6-8b1d9d5af0b3",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "848ba3cb-0f64-408d-9eca-776fb589aa58",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.603Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T00:15:14.718Z",
                  "segmentEnd": "2016-09-06T00:15:19.457Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T00:15:19.457Z",
                  "segmentEnd": "2016-09-06T00:15:31.104Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T00:15:31.128Z",
                  "segmentEnd": "2016-09-06T00:15:31.128Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "585f63eb-e0be-47b6-a1d0-c65ba586bef2",
      "conversationStart": "2016-09-06T07:06:11.478Z",
      "participants": [
        {
          "participantId": "b8718784-1d61-487c-9a43-32570285564e",
          "userId": "d787f85c-f472-4421-a108-89053a15704f",
          "purpose": "user",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "ec856b29-9bf5-461c-a292-9cbb74d690c3",
              "ani": "sip:ipadphone@172.18.182.10",
              "direction": "outbound",
              "dnis": "tel:+81359891323",
              "edgeId": "02788ec8-941f-4fdd-b4d8-e43da809220c",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:06:11.478Z",
                  "segmentEnd": "2016-09-06T07:06:11.510Z",
                  "segmentType": "dialing",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:06:11.510Z",
                  "segmentEnd": "2016-09-06T07:06:49.303Z",
                  "disconnectType": "peer",
                  "segmentType": "interact",
                  "conference": false
                }
              ]
            }
          ]
        },
        {
          "participantId": "f3ddaeaf-ed55-44cd-90e7-a875edb03473",
          "participantName": "Tokyo, Japan",
          "purpose": "ivr",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "416bb21f-873b-4bde-9258-0ebc0327ea7b",
              "ani": "tel:+81399999998",
              "direction": "inbound",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:06:11.502Z",
                  "segmentEnd": "2016-09-06T07:06:11.506Z",
                  "segmentType": "system",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:06:11.506Z",
                  "segmentEnd": "2016-09-06T07:06:19.492Z",
                  "segmentType": "ivr",
                  "conference": false
                }
              ]
            }
          ]
        },
        {
          "participantId": "a481b492-cb7a-4a56-9275-f61efa218fb7",
          "participantName": "JATest Queue",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "4458ac71-6556-4bf8-a184-16c387e13ddb",
              "ani": "tel:+81399999998",
              "direction": "inbound",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:06:19.524Z",
                  "segmentEnd": "2016-09-06T07:06:19.528Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "segmentType": "delay",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:06:19.528Z",
                  "segmentEnd": "2016-09-06T07:06:33.231Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "disconnectType": "transfer",
                  "segmentType": "interact",
                  "sipResponseCodes": [
                    410
                  ],
                  "conference": false
                }
              ]
            }
          ]
        },
        {
          "participantId": "8f619b51-f969-441a-bc09-66690aba8765",
          "userId": "8c88c7f8-b6ba-4761-b2e5-4ae4425a3991",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "d793e20d-d919-4d12-aec1-bdb145aa5f31",
              "ani": "sip:+81399999998@172.18.182.10;user=phone",
              "direction": "inbound",
              "dnis": "sip:524b28b06c2fdb575c2bbd29+inin.orgspan.com@localhost",
              "edgeId": "02788ec8-941f-4fdd-b4d8-e43da809220c",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:06:24.901Z",
                  "segmentEnd": "2016-09-06T07:06:24.901Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "errorCode": "error.ininedgecontrol.connection.protocol",
                  "segmentType": "alert",
                  "conference": false
                }
              ]
            }
          ]
        },
        {
          "participantId": "5e14f33d-cf9f-47d5-a0b2-bd9f0fbe0b4f",
          "userId": "8c88c7f8-b6ba-4761-b2e5-4ae4425a3991",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "1c5764ba-bd55-48ab-9ef9-b9831bcaaca3",
              "ani": "sip:+81399999998@172.18.182.10;user=phone",
              "direction": "inbound",
              "dnis": "sip:524b28b06c2fdb575c2bbd29+inin.orgspan.com@localhost",
              "edgeId": "02788ec8-941f-4fdd-b4d8-e43da809220c",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:06:27.802Z",
                  "segmentEnd": "2016-09-06T07:06:33.227Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "segmentType": "alert",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:06:33.227Z",
                  "segmentEnd": "2016-09-06T07:06:49.299Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "disconnectType": "client",
                  "segmentType": "interact",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:06:49.016Z",
                  "segmentEnd": "2016-09-06T07:06:54.016Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "wrapUpCode": "1ccb1c09-9495-4034-b377-b809f58d17da",
                  "disconnectType": "client",
                  "segmentType": "wrapup",
                  "conference": false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "001ca953-b79b-43a1-b8a9-0d9d4c95b617",
      "conversationStart": "2016-09-06T07:06:58.701Z",
      "participants": [
        {
          "participantId": "e3ea404b-cddf-4f9d-aeb7-4fcbfa3fc4c6",
          "userId": "d787f85c-f472-4421-a108-89053a15704f",
          "purpose": "user",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "3ad467fb-31d4-429e-9bfe-edd77a58c96c",
              "ani": "sip:ipadphone@172.18.182.10",
              "direction": "outbound",
              "dnis": "tel:+81359891323",
              "edgeId": "02788ec8-941f-4fdd-b4d8-e43da809220c",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:06:58.701Z",
                  "segmentEnd": "2016-09-06T07:06:58.725Z",
                  "segmentType": "dialing",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:06:58.725Z",
                  "segmentEnd": "2016-09-06T07:07:33.021Z",
                  "disconnectType": "endpoint",
                  "segmentType": "interact",
                  "conference": false
                }
              ]
            }
          ]
        },
        {
          "participantId": "6e54f37e-4510-4971-b00c-10fc2d812b42",
          "participantName": "Tokyo, Japan",
          "purpose": "ivr",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "bd4a5e0a-abf9-41c5-9654-3bc3595405b2",
              "ani": "tel:+81399999998",
              "direction": "inbound",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:06:58.717Z",
                  "segmentEnd": "2016-09-06T07:06:58.721Z",
                  "segmentType": "system",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:06:58.721Z",
                  "segmentEnd": "2016-09-06T07:07:11.172Z",
                  "segmentType": "ivr",
                  "conference": false
                }
              ]
            }
          ]
        },
        {
          "participantId": "bca6d9e3-e47c-4637-bce3-8b57b92ed87a",
          "participantName": "JATest Queue",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "7509b580-0a20-41e4-b4bb-6148a3ed24ae",
              "ani": "tel:+81399999998",
              "direction": "inbound",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:07:11.196Z",
                  "segmentEnd": "2016-09-06T07:07:11.200Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "segmentType": "delay",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:07:11.200Z",
                  "segmentEnd": "2016-09-06T07:07:15.545Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "disconnectType": "transfer",
                  "segmentType": "interact",
                  "sipResponseCodes": [
                    410
                  ],
                  "conference": false
                }
              ]
            }
          ]
        },
        {
          "participantId": "fb762a47-c3f7-4c7e-8372-b6c3113096e1",
          "userId": "8c88c7f8-b6ba-4761-b2e5-4ae4425a3991",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "voice",
              "sessionId": "6b280782-6126-4dde-9ce9-4db5d9f90ad4",
              "ani": "sip:+81399999998@172.18.182.10;user=phone",
              "direction": "inbound",
              "dnis": "sip:524b28b06c2fdb575c2bbd29+inin.orgspan.com@localhost",
              "edgeId": "02788ec8-941f-4fdd-b4d8-e43da809220c",
              "segments": [
                {
                  "segmentStart": "2016-09-06T07:07:11.868Z",
                  "segmentEnd": "2016-09-06T07:07:15.541Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "segmentType": "alert",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:07:15.541Z",
                  "segmentEnd": "2016-09-06T07:07:33.021Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "disconnectType": "peer",
                  "segmentType": "interact",
                  "conference": false
                },
                {
                  "segmentStart": "2016-09-06T07:07:33.144Z",
                  "segmentEnd": "2016-09-06T07:08:12.144Z",
                  "queueId": "95c9d5f7-ad80-4572-857a-64d241cf4851",
                  "wrapUpCode": "1ccb1c09-9495-4034-b377-b809f58d17da",
                  "disconnectType": "peer",
                  "segmentType": "wrapup",
                  "conference": false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "e578dec2-ad56-4a45-bd72-e0b6b6e0b21a",
      "conversationStart": "2016-09-06T10:38:12.756Z",
      "participants": [
        {
          "participantId": "c075c049-85d7-48e5-96df-196cda453ad1",
          "participantName": "Chris Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "chat",
              "sessionId": "9bc0f97f-1c02-4d02-b9fc-98934ec8443c",
              "direction": "inbound",
              "roomId": "acd-a1f85a3a-5f83-4e75-a1e5-a5aa60f17765@conference.1.orgspan.com",
              "segments": [
                {
                  "segmentStart": "2016-09-06T10:38:12.756Z",
                  "segmentEnd": "2016-09-06T10:53:42.552Z",
                  "disconnectType": "system",
                  "segmentType": "interact",
                  "properties": [
                    {
                      "propertyType": "uuid",
                      "property": "recordingId",
                      "value": "4ea1bb05-7ffd-434e-ba22-503880e1866e"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "participantId": "2b13f890-c7ab-405f-9382-285e0bf52631",
          "userId": "6d8e95ea-0735-4410-ba17-d987a6f5ed74",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "chat",
              "sessionId": "fd239b9c-9df5-4682-8e6d-a99f90982bcd",
              "direction": "inbound",
              "roomId": "acd-a1f85a3a-5f83-4e75-a1e5-a5aa60f17765@conference.1.orgspan.com",
              "segments": [
                {
                  "segmentStart": "2016-09-06T10:38:13.045Z",
                  "segmentEnd": "2016-09-06T10:38:15.699Z",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T10:38:15.699Z",
                  "segmentEnd": "2016-09-06T10:53:42.552Z",
                  "disconnectType": "system",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T10:53:42.923Z",
                  "segmentEnd": "2016-09-06T11:31:03.923Z",
                  "wrapUpCode": "7fb334b0-0e9e-11e4-9191-0800200c9a66",
                  "wrapUpNote": "",
                  "disconnectType": "system",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "30567ffd-518a-49ac-8f3c-b10efeb63f1d",
      "conversationStart": "2016-09-06T11:30:01.978Z",
      "participants": [
        {
          "participantId": "5dd6153f-9ba5-4997-9878-9194189e5e09",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "f067932b-b509-4b5f-9810-6d13c255347f",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:01.978Z",
                  "segmentEnd": "2016-09-06T11:30:05.684Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "85a77628-e5bd-4868-946d-4eea40e15527",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "693215e9-b02e-4c8a-a04a-c86b0e9b73d5",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:01.978Z",
                  "segmentEnd": "2016-09-06T11:30:11.023Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "47e75a6c-2a14-4cbf-87d6-0f74eadfc2e8",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "523eb5f7-7f57-4a3d-b896-e3808bbd59f7",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:02.446Z",
                  "segmentEnd": "2016-09-06T11:30:05.686Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:30:05.686Z",
                  "segmentEnd": "2016-09-06T11:30:11.021Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:30:10.965Z",
                  "segmentEnd": "2016-09-06T11:30:10.965Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "694cf718-e794-40df-8063-f6cf3d575e86",
      "conversationStart": "2016-09-06T11:30:11.431Z",
      "participants": [
        {
          "participantId": "57ea0569-f975-4e8c-bf73-7d2d9d1206e3",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "6577427d-09d4-482b-a9ae-fa69238215b4",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "a0c6b69f4491892b5d2f2687373d8140",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:11.431Z",
                  "segmentEnd": "2016-09-06T11:30:13.047Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "636c0935-151a-4812-8be8-7260d27a1d45",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "84fad903-0758-4ab0-8d0a-32caacfacd84",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "a0c6b69f4491892b5d2f2687373d8140",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:11.431Z",
                  "segmentEnd": "2016-09-06T11:30:17.445Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "32bd785c-8818-4ad9-9c41-d1289f9770ff",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "45c7a8a6-9bb3-4876-a86c-64eae06d1fc7",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "a0c6b69f4491892b5d2f2687373d8140",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:11.706Z",
                  "segmentEnd": "2016-09-06T11:30:13.048Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:30:13.048Z",
                  "segmentEnd": "2016-09-06T11:30:17.444Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:30:17.439Z",
                  "segmentEnd": "2016-09-06T11:30:17.439Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "7837d6ab-d6e1-47c9-b945-1b579a9d958a",
      "conversationStart": "2016-09-06T11:30:17.938Z",
      "participants": [
        {
          "participantId": "b69ba8b4-9c92-4811-ba13-f8ec6a0a7b5f",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "2953e05a-97d9-4301-9c46-2f2147fb1191",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "487004b85eff7439a29bf7ff3da40d51",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:17.938Z",
                  "segmentEnd": "2016-09-06T11:30:19.599Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "36ba3b33-61f0-434a-8f9f-f0bc56e2d95e",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "0b159210-7241-4ece-a739-8e0c16976bc7",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "487004b85eff7439a29bf7ff3da40d51",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:17.938Z",
                  "segmentEnd": "2016-09-06T11:30:21.865Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "903f5e79-73e7-4568-8d53-0b4a8b653d97",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "9a9008c9-4e7c-4cf5-8751-5895ea57ed6b",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "487004b85eff7439a29bf7ff3da40d51",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:18.198Z",
                  "segmentEnd": "2016-09-06T11:30:19.601Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:30:19.601Z",
                  "segmentEnd": "2016-09-06T11:30:21.856Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:30:21.834Z",
                  "segmentEnd": "2016-09-06T11:30:21.834Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "d5f92a2a-58b7-43c1-a1e4-750bd514b350",
      "conversationStart": "2016-09-06T11:30:22.233Z",
      "participants": [
        {
          "participantId": "96221bed-c7d8-4e91-a0d6-9b32b0d690eb",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "4eb8773b-d916-4e25-acd2-e436388d4351",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "d5133e677423a8069767bfb4c3e37707",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:22.233Z",
                  "segmentEnd": "2016-09-06T11:30:23.748Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "cfeaf0fb-78aa-4004-88a1-bd311b9cf5ce",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "3a981df2-b7c7-4ee0-989a-fbdcfb254440",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "d5133e677423a8069767bfb4c3e37707",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:22.233Z",
                  "segmentEnd": "2016-09-06T11:30:33.850Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "046e348b-4c88-455d-baa7-39432159f340",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "d7613111-3e2d-4d93-827c-b0a6ca0a3bfb",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "d5133e677423a8069767bfb4c3e37707",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:22.433Z",
                  "segmentEnd": "2016-09-06T11:30:23.752Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:30:23.752Z",
                  "segmentEnd": "2016-09-06T11:30:33.846Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:30:33.864Z",
                  "segmentEnd": "2016-09-06T11:30:33.864Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "5039115b-fd9f-4736-90d4-971216e57301",
      "conversationStart": "2016-09-06T11:30:34.255Z",
      "participants": [
        {
          "participantId": "5e0d9b94-c3c9-45ba-b2d6-1193c0c09c28",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "a5cfda58-caa1-4963-8557-b16a9f5c7698",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "768393cef69b3152510613e09c7ff2d4",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:34.255Z",
                  "segmentEnd": "2016-09-06T11:30:48.199Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "50af7494-b514-460a-ab9c-1a07fdbb1620",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "d51b4e3a-8bfe-47d8-8883-641f8b4a457e",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "768393cef69b3152510613e09c7ff2d4",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:34.255Z",
                  "segmentEnd": "2016-09-06T11:30:36.083Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "ded5cfca-80e9-4aaf-b761-a7ea7329e56f",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "fef630db-102e-44ff-a503-cf9de9f54806",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "768393cef69b3152510613e09c7ff2d4",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:34.482Z",
                  "segmentEnd": "2016-09-06T11:30:36.091Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:30:36.091Z",
                  "segmentEnd": "2016-09-06T11:30:48.198Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:30:48.208Z",
                  "segmentEnd": "2016-09-06T11:30:48.208Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "b822feb6-1836-46ab-867e-e15ca64a6ce5",
      "conversationStart": "2016-09-06T11:30:59.205Z",
      "participants": [
        {
          "participantId": "afb8320b-2db5-4ccd-bb6c-aa0038b61153",
          "participantName": "Chris Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "chat",
              "sessionId": "c43a9eaf-7a32-4bde-aa08-d57b8aa36b49",
              "direction": "inbound",
              "roomId": "acd-0f9a94fa-8ba8-42cf-a75e-a161d33a5126@conference.1.orgspan.com",
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:59.205Z",
                  "segmentEnd": "2016-09-06T11:48:42.688Z",
                  "disconnectType": "system",
                  "segmentType": "interact",
                  "properties": [
                    {
                      "propertyType": "uuid",
                      "property": "recordingId",
                      "value": "15b013c8-36c0-4c9f-80a8-3fe28db3cacf"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "participantId": "f8fb3b2e-6b18-488d-9a58-afd41658a005",
          "userId": "6d8e95ea-0735-4410-ba17-d987a6f5ed74",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "chat",
              "sessionId": "21ecb3e8-816f-42b0-a3e8-3eb3be4b1ad8",
              "direction": "inbound",
              "roomId": "acd-0f9a94fa-8ba8-42cf-a75e-a161d33a5126@conference.1.orgspan.com",
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:30:59.324Z",
                  "segmentEnd": "2016-09-06T11:31:05.423Z",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:31:05.423Z",
                  "segmentEnd": "2016-09-06T11:48:42.688Z",
                  "disconnectType": "system",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:48:43.694Z",
                  "segmentEnd": "2016-09-06T12:02:38.694Z",
                  "wrapUpCode": "7fb334b0-0e9e-11e4-9191-0800200c9a66",
                  "wrapUpNote": "",
                  "disconnectType": "system",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "9b97e59b-5f41-489a-b8f0-920a73618d03",
      "conversationStart": "2016-09-06T11:51:59.569Z",
      "participants": [
        {
          "participantId": "5b672632-63cc-4f47-8b0c-b5f3493a2694",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "b99454d2-dd40-4909-a412-7bc5be4868d8",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "c84376b8d14be6cbef939bd98ef20d5e",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:51:59.569Z",
                  "segmentEnd": "2016-09-06T11:52:03.756Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "faf6c4ab-0444-490c-8858-5a6d6c032db3",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "21ccf9db-bb87-452c-a763-588de5991258",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "c84376b8d14be6cbef939bd98ef20d5e",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:51:59.569Z",
                  "segmentEnd": "2016-09-06T11:52:31.352Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "e811a8ad-4b41-454c-9d5c-2aaf62c8f066",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "5af32392-8da6-4c6f-b839-ff50d3cce03f",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "c84376b8d14be6cbef939bd98ef20d5e",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:51:59.891Z",
                  "segmentEnd": "2016-09-06T11:52:03.760Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:52:03.760Z",
                  "segmentEnd": "2016-09-06T11:52:31.350Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:52:31.274Z",
                  "segmentEnd": "2016-09-06T11:52:31.274Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "f68be6dd-87f6-4442-beac-b240a3572c91",
      "conversationStart": "2016-09-06T11:52:31.904Z",
      "participants": [
        {
          "participantId": "8eb69213-853b-453a-9f7c-a5b8926512db",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "3c094bf8-e403-4cfd-b286-c477c76de463",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "c72b7450fc248498003aa52c38468f38",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+15023652427"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:31.904Z",
                  "segmentEnd": "2016-09-06T11:52:34.697Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "ff49aa18-bbcc-417e-b379-66bd0c5ac469",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "284bdd0c-8243-4bda-88b7-6ad35ee0e980",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "c72b7450fc248498003aa52c38468f38",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+15023652427"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:31.904Z",
                  "segmentEnd": "2016-09-06T11:52:35.917Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "954008dd-6fdf-4f3f-8c61-f83a50018db2",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "e273ddf2-53d3-40da-8e64-68bf62bf21cd",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "c72b7450fc248498003aa52c38468f38",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+15023652427"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:32.203Z",
                  "segmentEnd": "2016-09-06T11:52:34.701Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:52:34.701Z",
                  "segmentEnd": "2016-09-06T11:52:35.916Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:52:35.911Z",
                  "segmentEnd": "2016-09-06T11:52:35.911Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "bc828c72-3b23-43f5-91d9-cfc8df163ac5",
      "conversationStart": "2016-09-06T11:52:36.371Z",
      "participants": [
        {
          "participantId": "6ea320ec-d8af-4780-a36c-54b447acc8a9",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "ad1545d1-23a7-4e4f-b267-9b5e0cadf82e",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "4991074e077744eab09165536b9c863b",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:36.371Z",
                  "segmentEnd": "2016-09-06T11:52:38.894Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "48c7700f-8ccb-4edd-9023-2724c6cb8ac5",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "a46a7a75-93f7-479f-b802-2eb74ef1e8ea",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "4991074e077744eab09165536b9c863b",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:36.371Z",
                  "segmentEnd": "2016-09-06T11:52:37.597Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "0de3c78f-c64c-4c5d-9f7c-c3563c1379e6",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "502c9829-d5cd-40b6-b71c-2ddf781b5b46",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "4991074e077744eab09165536b9c863b",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:36.622Z",
                  "segmentEnd": "2016-09-06T11:52:37.603Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:52:37.603Z",
                  "segmentEnd": "2016-09-06T11:52:38.893Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:52:38.874Z",
                  "segmentEnd": "2016-09-06T11:52:38.874Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "cd91ca29-1324-4846-8587-575b4427072c",
      "conversationStart": "2016-09-06T11:52:39.443Z",
      "participants": [
        {
          "participantId": "899322a1-910f-45b0-9058-66983f370375",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "fffae530-51c0-4ade-8ca0-460fe19e4419",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "5265f5f7fa2d8ff1118a662b65250056",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:39.443Z",
                  "segmentEnd": "2016-09-06T11:52:42.055Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "c82d7d0c-3886-45de-8825-8a537c303300",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "b2a65948-b02c-477d-bbdd-398e5928f310",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "5265f5f7fa2d8ff1118a662b65250056",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:39.443Z",
                  "segmentEnd": "2016-09-06T11:52:40.848Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "4fc0e59b-f69a-48a3-8272-8cbcc9774217",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "8df061ce-919c-491f-af9e-152ab177bfa9",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "5265f5f7fa2d8ff1118a662b65250056",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:39.813Z",
                  "segmentEnd": "2016-09-06T11:52:40.849Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:52:40.849Z",
                  "segmentEnd": "2016-09-06T11:52:42.055Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:52:42.013Z",
                  "segmentEnd": "2016-09-06T11:52:42.013Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "6d152c55-de35-4401-af53-e8c8d11a6aea",
      "conversationStart": "2016-09-06T11:52:42.399Z",
      "participants": [
        {
          "participantId": "d6d89a29-3fcf-4cd3-b9d5-35acdd6f288c",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "81a3e798-9e26-4db4-bde0-33d5ffc0fbf7",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "0bb5cb9b0bfc4d1b2f8f03afac80e629",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:42.399Z",
                  "segmentEnd": "2016-09-06T11:52:51.967Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "2554d08d-1742-4c07-8cb2-6e290b507fdd",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "f2570077-cde5-4d82-8ff4-308b23a695d1",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "0bb5cb9b0bfc4d1b2f8f03afac80e629",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:42.399Z",
                  "segmentEnd": "2016-09-06T11:52:48.412Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "cb18f120-d7ed-4d29-9baf-1288a56cb17b",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "198b79a2-1748-483c-8ca3-24bdb6e47b84",
              "outboundCampaignId": "3a307696-e007-4697-b4f7-935620be1ead",
              "outboundContactId": "0bb5cb9b0bfc4d1b2f8f03afac80e629",
              "outboundContactListId": "24cca2e4-5192-4aa6-968f-fa0c8d85272e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "3b6d13a0-a355-11e5-9c05-41b9745b88ac",
              "skipEnabled": true,
              "timeoutSeconds": 60,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:42.583Z",
                  "segmentEnd": "2016-09-06T11:52:48.413Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:52:48.413Z",
                  "segmentEnd": "2016-09-06T11:52:51.965Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:52:51.945Z",
                  "segmentEnd": "2016-09-06T11:52:51.945Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "46e175b4-0f1c-4485-b390-9023c15595df",
      "conversationStart": "2016-09-06T11:52:55.590Z",
      "participants": [
        {
          "participantId": "6a900fab-e2ed-42c2-9650-afcecb304b7b",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "d842f9d8-2fa9-450d-a3f5-a6f0946628b6",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:55.590Z",
                  "segmentEnd": "2016-09-06T11:53:03.803Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "ac21227c-c656-4920-ac21-d6df48ec2204",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "e7cd75fb-b330-441a-85ee-fbd363a7d7d4",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:55.590Z",
                  "segmentEnd": "2016-09-06T11:52:57.258Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "4c4b8d96-7a0b-4c69-8fd7-f2dd972ba361",
          "userId": "cd707b2b-4dc8-4d88-9750-b1f412ef67e6",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "4c9cdcb2-cffe-4edc-92dd-b848d85fee74",
              "outboundCampaignId": "e4185e91-656e-453c-9fa6-97a5bc4f1839",
              "outboundContactId": "38a1195b0f6285bfe8086ffd6e0be2e1",
              "outboundContactListId": "d4f05236-8c46-43c7-a5a4-bd50b4773f67",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13175202754"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.604Z",
              "scriptId": "e631fc80-ce96-11e5-8c05-473ec65a1df8",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T11:52:55.829Z",
                  "segmentEnd": "2016-09-06T11:52:57.263Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T11:52:57.263Z",
                  "segmentEnd": "2016-09-06T11:53:03.801Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T11:53:03.779Z",
                  "segmentEnd": "2016-09-06T11:53:03.779Z",
                  "queueId": "db3ceec4-eb54-48f7-bf52-373b86dd4ebc",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "e0f739ca-c3de-49b2-ac85-6d13915fbd4c",
      "conversationStart": "2016-09-06T12:06:08.924Z",
      "participants": [
        {
          "participantId": "fffb4c42-f3b9-4a3f-96d6-e778c49dd11a",
          "participantName": "Chris Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "chat",
              "sessionId": "8b68c70f-61ac-4a68-9f9a-7e0b00ce30ee",
              "direction": "inbound",
              "roomId": "acd-5d73cac4-dc50-475c-a86f-a1cf8eea972d@conference.1.orgspan.com",
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:06:08.924Z",
                  "segmentEnd": "2016-09-06T12:23:42.829Z",
                  "disconnectType": "system",
                  "segmentType": "interact",
                  "properties": [
                    {
                      "propertyType": "uuid",
                      "property": "recordingId",
                      "value": "266d29e6-b7bc-4f05-931f-7d40c1b99856"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "participantId": "12e4c353-bf55-4070-b219-708a0c601e65",
          "userId": "6d8e95ea-0735-4410-ba17-d987a6f5ed74",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "chat",
              "sessionId": "5cfa276d-ce0c-4f2e-b3fa-9b992d73ef16",
              "direction": "inbound",
              "roomId": "acd-5d73cac4-dc50-475c-a86f-a1cf8eea972d@conference.1.orgspan.com",
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:06:08.996Z",
                  "segmentEnd": "2016-09-06T12:06:12.722Z",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T12:06:12.722Z",
                  "segmentEnd": "2016-09-06T12:23:42.829Z",
                  "disconnectType": "system",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T12:23:43.169Z",
                  "segmentEnd": "2016-09-06T12:24:15.169Z",
                  "wrapUpCode": "7fb334b0-0e9e-11e4-9191-0800200c9a66",
                  "wrapUpNote": "",
                  "disconnectType": "system",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "a0a90eb3-3c6d-44f6-8d8c-4333f1c54ba0",
      "conversationStart": "2016-09-06T12:26:12.280Z",
      "participants": [
        {
          "participantId": "cdebe81a-4272-4139-9caf-deb1892c2a97",
          "participantName": "Chris Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "chat",
              "sessionId": "30a6bb32-0572-444f-995f-763e03f7675f",
              "direction": "inbound",
              "roomId": "acd-afd7fcf7-9995-40f6-b7c2-57d49b42c34a@conference.1.orgspan.com",
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:26:12.280Z",
                  "segmentEnd": "2016-09-06T12:43:43.016Z",
                  "disconnectType": "system",
                  "segmentType": "interact",
                  "properties": [
                    {
                      "propertyType": "uuid",
                      "property": "recordingId",
                      "value": "a187517e-2f2f-4054-9165-f4f3b4b95c02"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "participantId": "daa28592-89f7-43d6-8cf6-c47de9794149",
          "userId": "6d8e95ea-0735-4410-ba17-d987a6f5ed74",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "chat",
              "sessionId": "d619a90d-78c0-4e56-912d-3ebef0d6abad",
              "direction": "inbound",
              "roomId": "acd-afd7fcf7-9995-40f6-b7c2-57d49b42c34a@conference.1.orgspan.com",
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:26:12.331Z",
                  "segmentEnd": "2016-09-06T12:26:16.459Z",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T12:26:16.459Z",
                  "segmentEnd": "2016-09-06T12:43:43.016Z",
                  "disconnectType": "system",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "09bfeb5e-7e4b-4572-a44a-cc05120efd5e",
      "conversationStart": "2016-09-06T12:43:57.104Z",
      "participants": [
        {
          "participantId": "c0fa71f3-2159-4414-9f6d-61e40c0f3bde",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "f9a6f861-ad68-49ae-9ee8-d94b1891f100",
              "outboundCampaignId": "441c895a-bf40-4232-b0e6-d7e381c1b143",
              "outboundContactId": "b923067d9120d20e9bb628de3e2c1ac0",
              "outboundContactListId": "e7f8f097-11ee-404e-8b5b-61178ad70e5e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13172222224",
                "+13172222222",
                "+13172222223"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.605Z",
              "scriptId": "a57113b0-1bfb-11e4-beaf-63b06a38cd4d",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:43:57.104Z",
                  "segmentEnd": "2016-09-06T12:46:56.168Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "ee400233-3eab-4897-b1a9-36685f77eb3f",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "c0550c89-ea44-4f71-a8ac-cc72ddc5a5c9",
              "outboundCampaignId": "441c895a-bf40-4232-b0e6-d7e381c1b143",
              "outboundContactId": "b923067d9120d20e9bb628de3e2c1ac0",
              "outboundContactListId": "e7f8f097-11ee-404e-8b5b-61178ad70e5e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13172222224",
                "+13172222222",
                "+13172222223"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.605Z",
              "scriptId": "a57113b0-1bfb-11e4-beaf-63b06a38cd4d",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:43:57.104Z",
                  "segmentEnd": "2016-09-06T12:44:04.826Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "4d0f7a82-56ac-412f-9ea8-16bc4308418a",
          "userId": "6e5a2c20-84fa-4ec6-9cb1-cd4a53fe235b",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "ad19f8e2-b0b0-43a1-84ef-7645d77949f9",
              "outboundCampaignId": "441c895a-bf40-4232-b0e6-d7e381c1b143",
              "outboundContactId": "b923067d9120d20e9bb628de3e2c1ac0",
              "outboundContactListId": "e7f8f097-11ee-404e-8b5b-61178ad70e5e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13172222224",
                "+13172222222",
                "+13172222223"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.605Z",
              "scriptId": "a57113b0-1bfb-11e4-beaf-63b06a38cd4d",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:43:59.744Z",
                  "segmentEnd": "2016-09-06T12:44:04.828Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T12:44:04.828Z",
                  "segmentEnd": "2016-09-06T12:44:06.738Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T12:44:06.738Z",
                  "segmentEnd": "2016-09-06T12:46:56.166Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "disconnectType": "client",
                  "segmentType": "hold"
                },
                {
                  "segmentStart": "2016-09-06T12:46:55.972Z",
                  "segmentEnd": "2016-09-06T12:46:55.972Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "conversationId": "74dae670-7400-4763-916a-160bb9f848fc",
      "conversationStart": "2016-09-06T12:46:56.695Z",
      "participants": [
        {
          "participantId": "30946f31-ce4f-4810-8087-5e7e14f7c77c",
          "purpose": "acd",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "ca076951-d432-4881-9bb8-0eb0c3b450f9",
              "outboundCampaignId": "441c895a-bf40-4232-b0e6-d7e381c1b143",
              "outboundContactId": "e9530b8ad37e2de9eb3e93328ad9c2af",
              "outboundContactListId": "e7f8f097-11ee-404e-8b5b-61178ad70e5e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13172222224",
                "+13172222222",
                "+13172222223"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.605Z",
              "scriptId": "a57113b0-1bfb-11e4-beaf-63b06a38cd4d",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:46:56.695Z",
                  "segmentEnd": "2016-09-06T12:50:53.107Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "disconnectType": "transfer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "c73a3e70-ddaa-48b6-8a81-004601763756",
          "participantName": "Customer",
          "purpose": "customer",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "75efe459-44e8-47df-b040-e3793f56974f",
              "outboundCampaignId": "441c895a-bf40-4232-b0e6-d7e381c1b143",
              "outboundContactId": "e9530b8ad37e2de9eb3e93328ad9c2af",
              "outboundContactListId": "e7f8f097-11ee-404e-8b5b-61178ad70e5e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13172222224",
                "+13172222222",
                "+13172222223"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.605Z",
              "scriptId": "a57113b0-1bfb-11e4-beaf-63b06a38cd4d",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:46:56.695Z",
                  "segmentEnd": "2016-09-06T18:45:23.161Z",
                  "disconnectType": "peer",
                  "segmentType": "interact"
                }
              ]
            }
          ]
        },
        {
          "participantId": "42556cf1-c9d4-4562-b74a-eb9d600b0d56",
          "userId": "6e5a2c20-84fa-4ec6-9cb1-cd4a53fe235b",
          "purpose": "agent",
          "sessions": [
            {
              "mediaType": "callback",
              "sessionId": "88718c7e-2eb7-4a70-8406-82af9238dd66",
              "outboundCampaignId": "441c895a-bf40-4232-b0e6-d7e381c1b143",
              "outboundContactId": "e9530b8ad37e2de9eb3e93328ad9c2af",
              "outboundContactListId": "e7f8f097-11ee-404e-8b5b-61178ad70e5e",
              "callbackUserName": "Customer",
              "callbackNumbers": [
                "+13172222224",
                "+13172222222",
                "+13172222223"
              ],
              "callbackScheduledTime": "2016-09-12T15:08:53.605Z",
              "scriptId": "a57113b0-1bfb-11e4-beaf-63b06a38cd4d",
              "skipEnabled": true,
              "timeoutSeconds": 0,
              "segments": [
                {
                  "segmentStart": "2016-09-06T12:47:09.337Z",
                  "segmentEnd": "2016-09-06T12:50:53.110Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "segmentType": "alert"
                },
                {
                  "segmentStart": "2016-09-06T12:50:53.110Z",
                  "segmentEnd": "2016-09-06T18:45:23.152Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "disconnectType": "client",
                  "segmentType": "interact"
                },
                {
                  "segmentStart": "2016-09-06T18:45:23.030Z",
                  "segmentEnd": "2016-09-06T18:45:23.030Z",
                  "queueId": "37d4b548-49a5-4b52-a79e-0a985248ae32",
                  "wrapUpCode": "ININ-OUTBOUND-PREVIEW-SKIPPED",
                  "wrapUpNote": "",
                  "disconnectType": "client",
                  "segmentType": "wrapup"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}, null, " "),
    actions:{
        selectQueryType(type) {
            this.set('queryType', type);
        },
        runQuery(){

        }

    }

});
