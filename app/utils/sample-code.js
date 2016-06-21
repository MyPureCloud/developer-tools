const sampleCode = [
    {
        name: "Get Current User",
        code: `//use that session to interface with the API
var users = new UsersApi(pureCloudSession);

console.log("getting ME");
users.getMe().done(function(userObject){
    console.log("got me");
    console.log(userObject);
    console.log("done");
});`
    },
    {
        name: "Update Presence",
        code: `//This example will toggle your status between available and busy.
// TIP: open the notification tester, subscribe to your presence and pin the notifications.
// You can see the websocket messages as your status changes.

var presenceApi = new PresenceApi(pureCloudSession);
var usersApi = new UsersApi(pureCloudSession);

var userId = null;

var availablePresenceId = null;
var busyPresenceId = null;

//method to set your presence for a given id.
function setPresence(presenceId){
  console.log("Setting presence to " + presenceId);
  // Create request body
  var newPresence = {
      "presenceDefinition" : {
          "id": presenceId
      }
  };

  // Patch presence
  presenceApi.patchUserIdPresencesSourceId(userId, 'PURECLOUD', newPresence);
}

//Start by getting all the presence definitions in the system
presenceApi.getPresencedefinitions().done(function(presenceData){
    for (var x=0; x< Object.keys(presenceData.entities).length; x++){
        var presence = presenceData.entities[x];

        //keep track of the busy and available statuses
        if(presence.systemPresence == "Busy"){
          busyPresenceId = presence.id;
        }else if(presence.systemPresence == "Available"){
          availablePresenceId = presence.id;
        }
    }

    console.log("got all presence info");

    //get your user information, including current presence info
    usersApi.getMe("presence").done(function(userObject){
        userId = userObject.id;

        var currentPresenceId = userObject.presence.presenceDefinition.id;
        console.log("Current presence id: " + currentPresenceId);

        if(currentPresenceId !== availablePresenceId){
          setPresence(availablePresenceId);
        }else{
          setPresence(busyPresenceId);
        }
    });
});
`
    },
    {
        name: "Place a Phone Call",
        code: `var conversationsApi = new ConversationsApi(pureCloudSession);

//create the request body, here (317) 222-2222 is the weather phone
// in Indianapolis.

var body = {
  phoneNumber: "3172222222"
};

conversationsApi.postCalls(body).done(function(result){
  console.log("call placed successfully");
  console.log(result);
}).error(function(error){
  console.error("Error Placing call", error);
});`
    },
    {
        name: "Get Documents in Content Management",
        code: `//This example will get the user's workspace and then list out
// all the documents in the workspace
var contentManagementApi = new ContentManagementApi(pureCloudSession);
var usersWorkspaceId = null;

contentManagementApi.getWorkspaces().done(function(workspaces){
    //iterate over the workspaces the user has access to
    for(var x=0; x< workspaces.entities.length; x++){

      if(workspaces.entities[x].isCurrentUserWorkspace){
        usersWorkspaceId = workspaces.entities[x].id;
        console.log("user's workspace id " + usersWorkspaceId);
      }

    }

    //get the documents for the workspace
    contentManagementApi.getDocuments(usersWorkspaceId).done(function(documents){
      var entities = documents.entities;
      for(var x=0; x< entities.length; x++){
        let document =entities[x];
        console.log(document.name, document.dateCreated);
      }
    }).error(function(error){
        console.error(error);
    });

}).error(function(error){
    console.error(error);
});`
    }
];

export default sampleCode;
