const sampleCode = [
  {
    api: "PureCloud SDK",
    name: "Get Current User",
    code: `//use that session to interface with the API
var users = new purecloud.platform.UsersApi(pureCloudSession);

console.log("getting ME");
users.getMe().then(function(userObject){
    console.log("got me");
    console.log(userObject);
    console.log("done");
});`
  },
  {
    api: "PureCloud SDK",
    name: "Update Presence",
    code: `//This example will toggle your status between available and busy.
// TIP: open the notification tester, subscribe to your presence and pin the notifications.
// You can see the websocket messages as your status changes.

var presenceApi = new purecloud.platform.PresenceApi(pureCloudSession);
var usersApi = new purecloud.platform.UsersApi(pureCloudSession);

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
presenceApi.getPresencedefinitions().then(function(presenceData){
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
    usersApi.getMe("presence").then(function(userObject){
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
    api: "PureCloud SDK",
    name: "Place a Phone Call",
    code: `var conversationsApi = new purecloud.platform.ConversationsApi(pureCloudSession);

//create the request body, here (317) 222-2222 is the weather phone
// in Indianapolis.

var body = {
  phoneNumber: "3172222222"
};

conversationsApi.postCalls(body).then(function(result){
  console.log("call placed successfully");
  console.log(result);
}).catch(function(error){
  console.error("Error Placing call", error);
});`
  },
  {
    api: "PureCloud SDK",
    name: "Get Documents in Content Management",
    code: `//This example will get the user's workspace and then list out
// all the documents in the workspace
var contentManagementApi = new purecloud.platform.ContentManagementApi(pureCloudSession);
var usersWorkspaceId = null;

contentManagementApi.getWorkspaces().then(function(workspaces){
    //iterate over the workspaces the user has access to
    for(var x=0; x< workspaces.entities.length; x++){

      if(workspaces.entities[x].isCurrentUserWorkspace){
        usersWorkspaceId = workspaces.entities[x].id;
        console.log("user's workspace id " + usersWorkspaceId);
      }

    }

    //get the documents for the workspace
    contentManagementApi.getDocuments(usersWorkspaceId).then(function(documents){
      var entities = documents.entities;
      for(var x=0; x< entities.length; x++){
        let document =entities[x];
        console.log(document.name, document.dateCreated);
      }
    }).catch(function(error){
        console.error(error);
    });

}).catch(function(error){
    console.error(error);
});`
  },
  {
    api: "PureCloud SDK",
    name: "User Paging",
    code: `//This example will log out a list of all users in the system.
var users = new purecloud.platform.UsersApi(pureCloudSession);

console.log("getting ME");

function processPageOfUsers(results){
  for(var x=0; x< results.entities.length; x++){
    console.log(results.entities[x].name);
  }

  if(results.nextUri){
    //get the next page of users directly
    pureCloudSession.get(results.nextUri).then(processPageOfUsers);
  }

}

users.getUsers().then(processPageOfUsers);`
  },
  {
    api: "PureCloud SDK",
    name: "Get Org Details",
    code: `var orgApi = new purecloud.platform.OrganizationApi(pureCloudSession);

orgApi.getMe().then(function(result){
    console.log(result);
});`
  },
  {
    api: "Architect SDK",
    name: "Basic Flow Example",
    code: ` function scriptMain() {
      var flowName = "FromTheDeveloperCenter";
      var flowDescription = flowName + ' description';
      return archScripting.factories.archFactoryFlows.createFlowInboundCallAsync(flowName, flowDescription,
                          archScripting.languages.archLanguages.englishUnitedStates, function (archInboundCallFlow) {
               archInboundCallFlow.initialAudio.setDefaultCaseLiteralTTS('welcome to the flow');
               // Create a menu and make it the starting menu for the flow.
               var mainMenu = archScripting.factories.archFactoryMenus.addMenu(archInboundCallFlow, 'top menu', 'Top Menu', true);
               var disconnectMenu2 = archScripting.factories.archFactoryMenus.addMenuDisconnect(mainMenu, 'DisconnectMenu', 9);
               var task = archScripting.factories.archFactoryTasks.addTask(archInboundCallFlow, 'First Task');
               var jumpToTask = archScripting.factories.archFactoryMenus.addMenuJumpToTask(mainMenu, 'JumpToTask', 8, task);
               var disconnect = archScripting.factories.archFactoryActions.addActionDisconnect(task, 'Disconnect');
               return archInboundCallFlow.saveAsync().then(function(){
                  return archInboundCallFlow.publishAsync();
               });
    });
}`
  }

];

export default sampleCode;
