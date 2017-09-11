import {architectRegion} from '../utils/purecloud-environment';
const architectHeader = `// const archScripting is the variable that contains the architect scripting library
const archActionFactory = archScripting.factories.archFactoryActions;  // Factory to create actions
const archEnums         = archScripting.enums.archEnums;               // Enum support
const archFlowFactory   = archScripting.factories.archFactoryFlows;    // Factory to create flows
const archLanguages     = archScripting.languages.archLanguages;       // Language support
const archMenuFactory   = archScripting.factories.archFactoryMenus;    // Factory to create menus
const archSession       = archScripting.environment.archSession;
const archTaskFactory   = archScripting.factories.archFactoryTasks;    // Factory to create tasks
const archPromiseFactory= archScripting.factories.archFactoryPromise;  // Factory to create Architect Promises
`;
const architectSessionStart = `

archSession.startWithAuthToken(`+ architectRegion() + `, scriptMain, token);
`;
/**
 * This is a map of all the sample code for the code editor.
 * @type {object}
 */

const sampleCode = {
  pureCloudSdk: {
    getCurrentUser: {
      name: "Get Current User",
      code: `//use that session to interface with the API
var users = new purecloud.platform.UsersApi(pureCloudSession);

console.log("getting ME");
users.getUsersMe().then(function(userObject){
    console.log("got me");
    console.log(userObject);
    console.log("done");
});`
    },
    updatePresence: {
      name: "Update Presence",
      code: `//This example will toggle your status between available and busy.
// TIP: open the notification tester, subscribe to your presence and pin the notifications.
// You can see the websocket messages as your status changes.

var presenceApi = new platformClient.PresenceApi();
var usersApi = new platformClient.UsersApi();

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
  presenceApi.getUserPresence(userId, 'PURECLOUD', newPresence);
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
    usersApi.getUsersMe({'expand': ["presence"]}).then(function(userObject){
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
    placeAPhoneCall: {
      name: "Place a Phone Call",
      code: `var conversationsApi = new purecloud.platform.ConversationsApi(pureCloudSession);

//create the request body, here (317) 222-2222 is the weather phone
// in Indianapolis.

var body = {
  phoneNumber: "3172222222"
};

conversationsApi.postConversationsCalls(body).then(function(result){
  console.log("call placed successfully");
  console.log(result);
}).catch(function(error){
  console.error("Error Placing call", error);
});`
    },
    getDocumentsInContentManagement: {
      name: "Get Documents in Content Management",
      code: `//This example will get the user's workspace and then list out
// all the documents in the workspace
var contentManagementApi = new platformClient.ContentManagementApi();
var usersWorkspaceId = null;

contentManagementApi.getContentmanagementWorkspaces().then(function(workspaces){
    //iterate over the workspaces the user has access to
    for(var x=0; x< workspaces.entities.length; x++){

      if(workspaces.entities[x].isCurrentUserWorkspace){
        usersWorkspaceId = workspaces.entities[x].id;
        console.log("user's workspace id " + usersWorkspaceId);
      }

    }

    //get the documents for the workspace
    contentManagementApi.getContentmanagementDocuments(usersWorkspaceId).then(function(documents){
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
    userPaging: {
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
    getOrgDetails: {
      name: "Get Org Details",
      code: `var orgApi = new purecloud.platform.OrganizationApi(pureCloudSession);
orgApi.getMe().then(function(result){
    console.log(result);
});`
    }
  },
  architectSdk: {
    basicFlowExample: {
      name: "Basic Flow Example",
      code: architectHeader +
      `
function scriptMain() {
  let flowName        = "SampleCode";
  let flowDescription = flowName + ' description';
  
  return archFlowFactory.createFlowInboundCallAsync(flowName, flowDescription,
    archLanguages.englishUnitedStates, function (archInboundCallFlow) {
    
      archInboundCallFlow.initialAudio.setDefaultCaseLiteralTTS('welcome to the flow');
    
      // Create a menu and make it the starting menu for the flow.
      let archMainMenu       = archMenuFactory.addMenu(archInboundCallFlow, 'top menu', 'Top Menu', true);
      let archDisconnectMenu = archMenuFactory.addMenuDisconnect(archMainMenu, 'DisconnectMenu', 9);
      let archTask           = archTaskFactory.addTask(archInboundCallFlow, 'First Task');
      let archJumpToTask     = archMenuFactory.addMenuJumpToTask(archMainMenu, 'Jump to Task', 8, archTask);
      let archDisconnect     = archScripting.factories.archFactoryActions.addActionDisconnect(archTask, 'Disconnect');
      return archInboundCallFlow.saveAsync().then(function(){
        return archInboundCallFlow.publishAsync();
      });
    });
}` + architectSessionStart
    },
    twoFlowExample: {
      name: "Two Flow Example",
      code: architectHeader +
      `
function scriptMain() {
  let flowName        = "SampleCode";
  let flowDescription = flowName + ' description';
  
  let flowPromise1    = archFlowFactory.createFlowInboundCallAsync(flowName+ "_1", flowDescription,
     archLanguages.englishUnitedStates, function (archInboundCallFlow) {
     
       archInboundCallFlow.initialAudio.setDefaultCaseLiteralTTS('welcome to the flow');
       // Create a menu and make it the starting menu for the flow.
        let archMainMenu       = archMenuFactory.addMenu(archInboundCallFlow, 'top menu', 'Top Menu', true);
        let archDisconnectMenu = archMenuFactory.addMenuDisconnect(archMainMenu, 'DisconnectMenu', 9);
        let archTask           = archTaskFactory.addTask(archInboundCallFlow, 'First Task');
        let archJumpToTask     = archMenuFactory.addMenuJumpToTask(archMainMenu, 'Jump to Task', 8, archTask);
        let archDisconnect     = archScripting.factories.archFactoryActions.addActionDisconnect(archTask, 'Disconnect');
        return archInboundCallFlow.saveAsync().then(function(){
         return archInboundCallFlow.publishAsync();
      });
     });
    
    var flowPromise2 = archFlowFactory.createFlowInboundCallAsync(flowName+ "_2", flowDescription,
      archLanguages.englishUnitedStates, function (archInboundCallFlow) {
      
        archInboundCallFlow.initialAudio.setDefaultCaseLiteralTTS('welcome to the flow');
        // Create a menu and make it the starting menu for the flow.
        let archMainMenu       = archMenuFactory.addMenu(archInboundCallFlow, 'top menu', 'Top Menu', true);
        let archDisconnectMenu = archMenuFactory.addMenuDisconnect(archMainMenu, 'DisconnectMenu', 9);
        let archTask           = archTaskFactory.addTask(archInboundCallFlow, 'First Task');
        let archJumpToTask     = archMenuFactory.addMenuJumpToTask(archMainMenu, 'Jump to Task', 8, archTask);
        let archDisconnect     = archScripting.factories.archFactoryActions.addActionDisconnect(archTask, 'Disconnect');
        return archInboundCallFlow.saveAsync().then(function(){
         return archInboundCallFlow.validateAsync();
        });  
    });
    
    return  archPromiseFactory.createPromise([flowPromise1, flowPromise2]);
}
` + architectSessionStart
    }
  }
};

export default sampleCode;
