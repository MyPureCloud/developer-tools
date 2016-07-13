import Ember from 'ember';

export default Ember.Route.extend({
	var userResult;
	var queueResult;
	var queueNameResult;
	var userNameResult;
	var results;
	var retry = false;
	// Determines whether names for GUIDs need to be retreived
	var refresh =  false;
	// Determines which GUID list key the refresh is working from
	var currentGUIDList = "";

	var GUIDs = [];

	var table = [];

	var tableFormatDefault = {
	  "mediaType": "voice",
	  "columns": [{
	    "displayIndex": 0,
	    "displayName": "Interval",
	    "displayFormat": "Interval",
	  }, {
	    "displayIndex": 1,
	    "displayName": "User",
	    "displayFormat": "User"
	  }, {
	    "displayIndex": 2,
	    "displayName": "Offered",
	    "displayFormat": "Number",
	    "valueExpression": "{nOffered.count}"
	  }, {
	    "displayIndex": 3,
	    "displayName": "Average Talk",
	    "displayFormat": "Number",
	    "valueExpression": "({tTalk.sum}/{tTalk.count})/1000"
	  }, {
	    "displayIndex": 4,
	    "displayName": "Average Wait",
	    "displayFormat": "Number",
	    "valueExpression": "{tWait.sum}/{tWait.count}/1000"
	  }, {
	    "displayIndex": 5,
	    "displayName": "Active",
	    "displayFormat": "Number",
	    "valueExpression": "{tActive.sum}"
	  }]
	};

	var tableFormat = tableFormatDefault;

	function setTableFormat() {
	  //Table format
	  tableFormat.columns = [];
	  var resultsConfigTable = document.getElementById('resultsConfigTable');
	  var resultsConfigTableRowCount = resultsConfigTable.rows.length;

	  for (i = 0; i < resultsConfigTableRowCount; i++) {
	    var row = resultsConfigTableRowCount.rows[i];
	    var name = row.cells[1].childNodes[0].value;
	    var format = row.cells[2].childNodes[0].value;
	    var value = row.cells[3].childNodes[0].value;

	    tableFormat.columns.push(createTableFormatColumn(i, name, format, value));
	  }
	  console.log(tableFormat);
	}

	function createTableFormatColumn(index, name, format, value) {
	  var object = {
	    "displayIndex": index,
	    "displayName": name,
	    "displayFormat": format,
	  }
	  if (value) {
	    object.valueExpression.push(value);
	  }
	}

	var AgentDimensions = [];

	AgentDimensions.push("addressFrom");
	AgentDimensions.push("addressTo");
	AgentDimensions.push("ani");
	AgentDimensions.push("callbackId");
	AgentDimensions.push("conference");
	AgentDimensions.push("contextId");
	AgentDimensions.push("conversationEnd");
	AgentDimensions.push("conversationId");
	AgentDimensions.push("destinationSessionId");
	AgentDimensions.push("direction");
	AgentDimensions.push("disconnectType");
	AgentDimensions.push("dnis");
	AgentDimensions.push("edgeId");
	AgentDimensions.push("errorCode");
	AgentDimensions.push("evaluationId");
	AgentDimensions.push("evaluatorId");
	AgentDimensions.push("eventTime");
	AgentDimensions.push("formId");
	AgentDimensions.push("formName");
	AgentDimensions.push("groupId");
	AgentDimensions.push("interactionType");
	AgentDimensions.push("mediaType");
	AgentDimensions.push("monitoredParticipantId");
	AgentDimensions.push("outboundCampaignId");
	AgentDimensions.push("outboundContactId");
	AgentDimensions.push("outboundContactListId");
	AgentDimensions.push("participantId");
	AgentDimensions.push("participantName");
	AgentDimensions.push("participantType");
	AgentDimensions.push("peerId");
	AgentDimensions.push("purpose");
	AgentDimensions.push("q850ResponseCode");
	AgentDimensions.push("queueId");
	//AgentDimensions.push("Queue Name");
	AgentDimensions.push("remoteNameDisplayable");
	AgentDimensions.push("requestedLanguageId");
	AgentDimensions.push("requestedRoutingSkillId");
	AgentDimensions.push("roomId");
	AgentDimensions.push("scriptId");
	AgentDimensions.push("segmentType");
	AgentDimensions.push("sessionId");
	AgentDimensions.push("sipResponseCode");
	AgentDimensions.push("sourceConversationId");
	AgentDimensions.push("sourceSessionId");
	AgentDimensions.push("stationId");
	AgentDimensions.push("userId");
	//AgentDimensions.push("User Name");
	AgentDimensions.push("wrapUpCode");
	AgentDimensions.push("wrapUpNote");

	var Metrics = [];

	var apiBody;

	function GetMetrics(category) {
	  console.log(category);
	  switch (category) {
	    case "Agents":
	      Metrics.push("nOffered");
	      Metrics.push("nTransferred");
	      Metrics.push("tAbandon");
	      Metrics.push("tACD");
	      Metrics.push("tActive");
	      Metrics.push("tAgentResponseTime");
	      Metrics.push("tAgentRoutingStatus");
	      Metrics.push("tAnswered");
	      Metrics.push("tHandle");
	      Metrics.push("tHeld");
	      Metrics.push("tIVR");
	      Metrics.push("tOrganizationPresence");
	      Metrics.push("tSystemPresence");
	      Metrics.push("tTalk");
	      Metrics.push("tTalkComplete");
	      Metrics.push("tHeldComplete");
	      Metrics.push("tUserResponseTime");
	      Metrics.push("tVoicemail");
	      Metrics.push("tWait");
	      return Metrics;
	    case "Campaigns":
	      Metrics.push("nOutboundAbandoned");
	      Metrics.push("nOutboundAttempted");
	      Metrics.push("nOutboundConnected");
	      Metrics.push("nTransferred");
	      Metrics.push("tAbandon");
	      Metrics.push("tACD");
	      Metrics.push("tAgentResponseTime");
	      Metrics.push("tAgentRoutingStatus");
	      Metrics.push("tAnswered");
	      Metrics.push("tHandle");
	      Metrics.push("tHeld");
	      Metrics.push("tIVR");
	      Metrics.push("tOrganizationPresence");
	      Metrics.push("tSystemPresence");
	      Metrics.push("tTalk");
	      Metrics.push("tTalkComplete");
	      Metrics.push("tHeldComplete");
	      Metrics.push("tUserResponseTime");
	      Metrics.push("tVoicemail");
	      Metrics.push("tWait");
	      return Metrics;
	    case "Interactions":
	      Metrics.push("nOffered");
	      Metrics.push("nTransferred");
	      Metrics.push("tAbandon");
	      Metrics.push("tACD");
	      Metrics.push("tAgentResponseTime");
	      Metrics.push("tAgentRoutingStatus");
	      Metrics.push("tAnswered");
	      Metrics.push("tHandle");
	      Metrics.push("tHeld");
	      Metrics.push("tIVR");
	      Metrics.push("tOrganizationPresence");
	      Metrics.push("tSystemPresence");
	      Metrics.push("tTalk");
	      Metrics.push("tTalkComplete");
	      Metrics.push("tHeldComplete");
	      Metrics.push("tUserResponseTime");
	      Metrics.push("tVoicemail");
	      Metrics.push("tWait");
	      return Metrics;
	    case "IVR":
	      Metrics.push("nTransferred");
	      Metrics.push("tAbandon");
	      Metrics.push("tACD");
	      Metrics.push("tAgentResponseTime");
	      Metrics.push("tAgentRoutingStatus");
	      Metrics.push("tAnswered");
	      Metrics.push("tHandle");
	      Metrics.push("tHeld");
	      Metrics.push("tIVR");
	      Metrics.push("tOrganizationPresence");
	      Metrics.push("tSystemPresence");
	      Metrics.push("tTalk");
	      Metrics.push("tTalkComplete");
	      Metrics.push("tHeldComplete");
	      Metrics.push("tUserResponseTime");
	      Metrics.push("tVoicemail");
	      Metrics.push("tWait");
	      return Metrics;
	    case "Queues":
	      Metrics.push("nOffered");
	      Metrics.push("nTransferred");
	      Metrics.push("tAbandon");
	      Metrics.push("tACD");
	      Metrics.push("tAgentResponseTime");
	      Metrics.push("tAgentRoutingStatus");
	      Metrics.push("tAnswered");
	      Metrics.push("tHandle");
	      Metrics.push("tHeld");
	      Metrics.push("tIVR");
	      Metrics.push("tOrganizationPresence");
	      Metrics.push("tSystemPresence");
	      Metrics.push("tTalk");
	      Metrics.push("tTalkComplete");
	      Metrics.push("tHeldComplete");
	      Metrics.push("tUserResponseTime");
	      Metrics.push("tVoicemail");
	      Metrics.push("tWait");
	      return Metrics;
	    default:
	      console.log("Category is not valid!");
	      return Metrics;
	  }
	}

	function CreateMetricsTableRow() {
	  var pageStr = "<tr><TD><INPUT type=\"checkbox\" name=\"chk\"/></TD><td><select>";

	  for (var i = 0; i < Metrics.length; i++) {
	    pageStr += "<option value=\"" + Metrics[i] + "\">" + Metrics[i] + "</option>";
	  }

	  pageStr += "</select></td></tr>"

	  return pageStr;
	}

	function CreateResutlsConfigTableRow() {
	  var pageStr = "<tr><TD><INPUT type=\"checkbox\" name=\"chk\"/></TD>";
	  pageStr += "<td><input style=\"width: 99%\" type=\"text\"></td>";
	  pageStr += "<td><input style=\"width: 99%\" type=\"text\"></td>";
	  pageStr += "<td><input style=\"width: 99%\" type=\"text\"></td></tr>";

	  return pageStr;
	}

	function CreateInitialQueryPage() {
	  var pageStr = "<tr><TD><INPUT type=\"checkbox\" name=\"chk\"/></TD><td><select>";

	  for (var i = 0; i < AgentDimensions.length; i++) {
	    pageStr += "<option value=\"" + AgentDimensions[i] + "\">" + AgentDimensions[i] + "</option>";
	  }

	  pageStr += "</select></td><td>=</td><td><input type=\"text\"></td></tr>"

	  return pageStr;
	}

	function CreateGroupByTableRow() {
	  var pageStr = "<tr><TD><INPUT type=\"checkbox\" name=\"chk\"/></TD><td><select>";

	  for (var i = 0; i < AgentDimensions.length; i++) {
	    pageStr += "<option value=\"" + AgentDimensions[i] + "\">" + AgentDimensions[i] + "</option>";
	  }

	  pageStr += "</select></td></tr>"

	  return pageStr;
	}

	function RetrieveOptions() {
	  var pageStr = "";

	  for (var i = 0; i < AgentDimensions.length; i++) {
	    console.log(AgentDimensions[i]);
	    pageStr += "<option value=\"" + AgentDimensions[i] + "\">" + AgentDimensions[i] + "</option>";
	  }

	  return pageStr;
	}

	function addRow(tableID) {

	  var table = document.getElementById(tableID);

	  var rowCount = table.rows.length;
	  var row = table.insertRow(rowCount);

	  var colCount = table.rows[0].cells.length;

	  for (var i = 0; i < colCount; i++) {

	    var newcell = row.insertCell(i);

	    newcell.innerHTML = table.rows[0].cells[i].innerHTML;
	    //alert(newcell.childNodes);
	    switch (newcell.childNodes[0].type) {
	      case "text":
	        console.log("text");
	        newcell.childNodes[0].value = "";
	        break;
	      case "checkbox":
	        console.log("checkbox");
	        newcell.childNodes[0].checked = false;
	        break;
	      default:
	        console.log("default");
	        console.log(newcell.childNodes[0].type);
	        break;
	    }
	  }
	}

	function deleteRow(tableID) {
	  try {
	    var table = document.getElementById(tableID);
	    var rowCount = table.rows.length;

	    for (var i = 0; i < rowCount; i++) {
	      var row = table.rows[i];
	      var chkbox = row.cells[0].childNodes[0];
	      if (null !== chkbox && true === chkbox.checked) {
	        if (rowCount <= 1) {
	          alert("Cannot delete all the rows.");
	          break;
	        }
	        table.deleteRow(i);
	        rowCount--;
	        i--;
	      }


	    }
	  } catch (e) {
	    alert(e);
	  }
	}

	function addRowWithHeader(tableID) {

	  var table = document.getElementById(tableID);

	  var rowCount = table.rows.length;
	  var row = table.insertRow(rowCount);

	  var colCount = table.rows[1].cells.length;

	  for (var i = 0; i < colCount; i++) {

	    var newcell = row.insertCell(i);

	    newcell.innerHTML = table.rows[1].cells[i].innerHTML;
	    //alert(newcell.childNodes);
	    switch (newcell.childNodes[0].type) {
	      case "text":
	        console.log("text");
	        newcell.childNodes[0].value = "";
	        break;
	      case "checkbox":
	        console.log("checkbox");
	        newcell.childNodes[0].checked = false;
	        break;
	      default:
	        console.log("default");
	        console.log(newcell.childNodes[0].type);
	        break;
	    }
	  }
	}

	function deleteRowWithHeader(tableID) {
	  try {
	    var table = document.getElementById(tableID);
	    var rowCount = table.rows.length;

	    for (var i = 1; i < rowCount; i++) {
	      var row = table.rows[i];
	      var chkbox = row.cells[0].childNodes[0];
	      if (null !== chkbox && true === chkbox.checked) {
	        if (rowCount <= 2) {
	          alert("Cannot delete all the rows.");
	          break;
	        }
	        table.deleteRow(i);
	        rowCount--;
	        i--;
	      }


	    }
	  } catch (e) {
	    alert(e);
	  }
	}

	function submitRawQuery() {
	  var queryEndpoint = document.getElementById("queryEndpointSelect").value;
	  var rawQuery = document.getElementById("rawQuery").value;

	  try {
	    apiBody = jQuery.parseJSON(rawQuery.trim());
	  } catch (e) {
	    document.getElementById("results").innerHTML = "Bad Request";
	    return;
	  }
	  var pureCloudSession = new PureCloudSession();
	  pureCloudSession.authToken(this.get("purecloud").get("session").options.token);
	  pureCloudSession.environment(${purecloudEnvironment});

	  var api = new AnalyticsApi(pureCloudSession);

	  console.log("REQUEST");
	  console.log(apiBody);
	    
	  switch(queryEndpoint){
	    case "conversationDetails":
	      api.postConversationsDetailsQuery(apiBody).then(processResults, processResults, processResults).catch(onQueryError);
	      break;
	    case "conversationsAggregate":
	      api.postConversationsAggregatesQuery(apiBody).then(processResults, processResults, processResults).catch(onQueryError);
	      break;
	  }
	}

	function RecordingQuery(conversationId){

	}

	function setAPIBody() {
	  apiBody = {
	    "interval": "",
	    "metrics": [],
	    "filter": {
	      "type": "",
	      "predicates": [
	        //{
	        //    "dimension": "outboundCampaignId",
	        //    "value": "f3fdc7df-0bf5-44e1-9efb-ec15d66327fa"
	        //},
	        //{
	        //    "dimension": "wrapUpCode",
	        //    "value": "ad7be961-ff55-41dd-a0dc-8dbbdddad95e"//No-Sale
	        //}
	      ]
	    }
	  };
	}

	function submit(tableID) {
	  try {
	    //reset the apiBody in case the user submits the queries multiple times
	    setAPIBody();

	    //INTERVALS
	    var startingDate = document.getElementById("startDate").value;
	    var endingDate = document.getElementById("endDate").value;
	    apiBody.interval = startingDate + "/" + endingDate;

	    //AND/OR
	    var andOrValue = document.getElementById("andOrSelect").value;
	    if (andOrValue !== false) {
	      apiBody.filter.type = andOrValue;
	    }

	    //GROUP BY VALUES
	    apiBody.groupBy = [];
	    var groupByTable = document.getElementById('groupByTable');
	    var groupByTableRowCount = groupByTable.rows.length;

	    for (var i = 0; i < groupByTableRowCount; i++) {
	      var groupByRow = groupByTable.rows[i];
	      var groupByDropdownbox = groupByRow.cells[1].childNodes[0].value;

	      apiBody.groupBy.push(groupByDropdownbox);
	    }

	    //METRICS
	    apiBody.metrics = [];
	    var metricsTable = document.getElementById('metricsTable');
	    var metricsTableRowCount = metricsTable.rows.length;

	    for (i = 0; i < metricsTableRowCount; i++) {
	      var metricsRow = metricsTable.rows[i];
	      var metricsRowDropdownbox = metricsRow.cells[1].childNodes[0].value;

	      apiBody.metrics.push(metricsRowDropdownbox);
	    }
	    //PREDICATES
	    var table = document.getElementById(tableID);
	    var rowCount = table.rows.length;

	    for (i = 0; i < rowCount; i++) {
	      var row = table.rows[i];
	      var dropdownbox = row.cells[1].childNodes[0].value;

	      var txtbox = "";

	      txtbox = row.cells[3].childNodes[0].value;

	      apiBody.filter.predicates.push(getPredicate(dropdownbox, txtbox));
	    }

	    //setHardCodedAPIBody();

	    var pureCloudSession = new PureCloudSession();
	    pureCloudSession.authToken(this.get("purecloud").get("session").options.token);
	    pureCloudSession.environment(${purecloudEnvironment});

	    var api = new AnalyticsApi(pureCloudSession);

	    console.log("REQUEST");
	    console.log(apiBody);

	    try {
	      results = api.postConversationsAggregatesQuery(apiBody);
	      results.then(processResults, processResults, processResults);
	    } catch (err) {
	      alert(err);
	    }

	    if (results) {
	      document.getElementById("results").innerHTML = "Retrieved API results";
	    } else {
	      document.getElementById("results").innerHTML = "Bad Request";
	    }

	    console.log("RESULTS");
	    console.log(results);
	  } catch (e) {
	    alert(e);
	  }
	}

	function processResults(data) {
	  results = data;
	  //if (results.status !== 200) {
	  console.log("results");
	  console.log(results);
	  //alert(results.responseText);
	}

	function onQueryError(data) {
	  console.log(data);
	  document.getElementById("results").innerHTML = JSON.stringify(data);
	}

	function printUserResults(userName) {
	  console.log(userResult);

	}

	function printUserResultsFailed(userName) {
	  console.log(userResult + 'userName, failed');
	}

	function getNextRecording() {
	  var pureCloudSession = new PureCloudSession();
	  pureCloudSession.authToken(this.get("purecloud").get("session").options.token);
	  pureCloudSession.environment(${purecloudEnvironment});
	  var recordingApi = new RecordingApi(pureCloudSession);

	  while (subQueries.index < subQueries.idList.length && subQueries.valueList[subQueries.index].length > 0) {
	    subQueries.index++;
	  }

	  if (subQueries.index < subQueries.idList.length) {
	    recordingApi.getConversationIdRecordings(subQueries.idList[subQueries.index], 3000).then(onNextRecordingIdComplete).catch(onNextRecordingError);
	  } else {
	    getNextQueueName();
	  }
	}

	function onNextRecordingError(err){
	  console.log("Get Recording Error: " + err);
	  if (err.statusText === "timeout"){
	    if(retry){
	      retry = false;
	      subQueries.index++;
	    }
	    else{
	      retry = true;      
	    }
	    getNextRecording();
	  }
	}

	function onNextRecordingIdComplete(result) {
	  console.log("ontNextRecordingIdComplete");
	  console.log(result);
	  var conversationId = result[0].conversationId;
	  var format = subQueries.formatList[subQueries.idList.indexOf(conversationId)];
	  try{
	    var value = evaluateExpression(result, format);
	    subQueries.valueList[subQueries.idList.indexOf(conversationId)] = value;
	  }
	  catch(err){
	    console.log(err+err.stack);
	  }
	  subQueries.index++;
	  getNextRecording();
	}

	function runGUIDQueries(){
	  var complete = true;
	  for (var property in GUIDs) {
	    if (GUIDs.hasOwnProperty(property)) {
	      // Find the next GUID that needs a refresh
	      if (!GUIDs[property].refreshed){
	        currentGUIDList = property;
	        complete = false;
	        getNextGUID();
	        break;
	      }
	    }
	  }
	  if (complete){
	    refresh = false;
	    buildResults();
	  }
	}

	function getNextGUID() {
	  var pureCloudSession = new PureCloudSession();
	  pureCloudSession.authToken(this.get("purecloud").get("session").options.token);
	  pureCloudSession.environment(${purecloudEnvironment});

	  // increment index until we find a queueId that doesn't have a name
	  while (GUIDs[currentGUIDList].index < GUIDs[currentGUIDList].idList.length && GUIDs[currentGUIDList].nameList[GUIDs[currentGUIDList].index].length > 0) {
	    GUIDs[currentGUIDList].index++;
	  }

	  if (GUIDs[currentGUIDList].index < GUIDs[currentGUIDList].idList.length) {
	    switch(GUIDs[currentGUIDList].URL){
	      case "Queue":
	        var routingApi = new RoutingApi(pureCloudSession);
	        routingApi.getQueuesQueueId(GUIDs[currentGUIDList].idList[GUIDs[currentGUIDList].index]).then(onNextGUIDComplete).catch(onNextGUIDError);
	        break;
	      case "User":
	        var usersApi = new UsersApi(pureCloudSession);
	        usersApi.getUserId(GUIDs[currentGUIDList].idList[GUIDs[currentGUIDList].index]).then(onNextGUIDComplete).catch(onNextGUIDError);
	        break;
	      case "WrapUpCode":
	        var routingApi = new RoutingApi(pureCloudSession);
	        routingApi.getWrapupcodesCodeId(GUIDs[currentGUIDList].idList[GUIDs[currentGUIDList].index]).then(onNextGUIDComplete).catch(onNextGUIDError);
	    }
	  } else {
	    GUIDs[currentGUIDList].refreshed = true;
	    runGUIDQueries();
	  }
	}

	function onNextGUIDComplete(result) {
	  console.log("ontNextGUIDComplete");
	  console.log(result);
	  var name = result.name;
	  var GUID = result.id;
	  GUIDs[currentGUIDList].nameList[GUIDs[currentGUIDList].idList.indexOf(GUID)] = name;
	  GUIDs[currentGUIDList].index++;
	  getNextGUID();
	}

	function onNextGUIDError(err){
	  console.log("onNextGUIDError" + err);
	  GUIDs[currentGUIDList].index++;
	  getNextGUID();  
	}

	function printQueueResults() {

	  for (var i = 0; i < queueResult.responseJSON.entities.length; i++) {
	    if (queueResult.responseJSON.entities[i].name == "Sales") {
	      console.log("You can't handle the truthy!!!");
	      break;
	    }
	  }
	}

	function getPredicate(dimension, value) {
	  var predicate = {
	    "dimension": dimension,
	    "value": value
	  };
	  return predicate;
	}

	function submitRawResults() {
	  var rawResults = document.getElementById("rawResults").value;
	  try {
	    tableFormat = jQuery.parseJSON(rawResults);
	    document.getElementById("formatResults").innerHTML = "Table Format Applied";
	  } catch (e) {
	    if (rawResults) {
	      document.getElementById("formatResults").innerHTML = "Bad Table Format";
	    } else {
	      document.getElementById("formatResults").innerHTML = "Table Format Reset";
	    }
	    tableFormat = tableFormatDefault;
	  }
	  buildResults();
	}

	function buildResults() {
	  var tableObj;

	  console.log("test Function");

	  buildResultsTable();

	  if ($.fn.dataTable.isDataTable('#example')) {
	    console.log("data table");

	    tableObj = $('#example').DataTable();
	    tableObj.destroy();
	  }

	  var dataTable = {
	    data: table,
	    columns: []
	  };
	  for (i = 0; i < tableFormat.columns.length; i++) {
	    dataTable.columns[i] = {
	      title: tableFormat.columns[i].displayName
	    };
	  }

	  if (refresh) {
	    runGUIDQueries();
	  } 
	  else {
	    $(document).ready(function() {
	      $('#example').DataTable(dataTable);
	    });
	  }
	}

	function convertInterval(date1, date2) {
	  // mm-dd-yy hh:mm
	  var month1 = (date1.getMonth() + 1);
	  if (month1 < 10) month1 = "0" + month1;
	  var day1 = (date1.getDate()).toString();
	  if (day1 < 10) day1 = "0" + day1;

	  var month2 = (date2.getMonth() + 1);
	  if (month2 < 10) month2 = "0" + month2;
	  var day2 = (date2.getDate()).toString();
	  if (day2 < 10) day2 = "0" + day2;

	  var interval = month1 + "\\" + day1 + " " + date1.toTimeString().substr(0, 5) + "-" + month2 + "\\" + day2 + " " + date2.toTimeString().substr(0, 5);
	  //var interval = (date1.getMonth() + 1).toString() + "-" + date1.getDate().toString();
	  return interval;x
	}

	function buildValueExpressionSubstring(valueExpression, index){
	  var value = "";
	  var format = valueExpression.split(".");
	  for (i=0; i<format.length; i++){
	    if (i >= index){
	      if (value.length > 0){
	        value += ".";
	      }
	      value += format[i];
	    }
	  }
	  return value;
	}

	function evaluateExpression(currentPosition, valueExpression){
	  var value = "";
	  if(valueExpression.includes(".")){
	    var format = valueExpression.split(".");
	    
	    for (v = 0; v < format.length; v++) {
	      // if '[' is found then looking at an array, not property
	      if (format[v].includes("[")) {
	        var split = format[v].split("[");
	        var left = split[0];
	        var right = split[1];
	        // Remove the ']' and the end of the string
	        right = right.slice(0, right.length - 1);
	        // if ': is inside the '[]' find the entry in the array that has that property value'
	        var split2 = right.split(":");
	        // looking for key/value pair in an array
	        if (right.includes(":")) {
	          for (p = 0; p < currentPosition[left].length; p++) {
	            if (currentPosition[left][p][split2[0]] === split2[1]) {
	              currentPosition = currentPosition[left][p];
	              break;
	            }
	          }
	        }
	        //index, not property value        
	        //This section needs to handle the following scenarios:
	        //1. variable[x]
	        //2. [x]
	        //3. variable[] (instead of the nth element's value of property x, it's all values from every element for the property x)    
	        //4. [], similar to 3
	        else {
	          //Scenarios 3 and 4
	          if (right.length === 0){
	            // Scenario 3, variable[]            
	            if (left.length > 0){
	              // Scenario 3, variable[] where length of variable[] is 1
	              if (currentPosition[left].length === 1){
	                value += "\r\n" + evaluateExpression(currentPosition[left][0], buildValueExpressionSubstring(valueExpression, v+1));
	              }
	              else{
	                for (l=0; l<currentPosition[left].length; l++){
	                  value += "\r\n" + evaluateExpression(currentPosition[left][l], buildValueExpressionSubstring(valueExpression, v+1));
	                }
	              }
	            }
	            // Scenario 4
	            else{
	              for (l=0; l<currentPosition.length; l++){
	                value += "\r\n" + evaluateExpression(currentPosition[l], buildValueExpressionSubstring(valueExpression, v+1));
	              }
	            }
	            break;
	          }
	          //Scenarios 1 and 2
	          else{
	            var index = parseInt(right);
	            if (index !== NaN){
	              if(left.length > 0){
	                // Scenario 1
	                currentPosition = currentPosition[left][index];
	              }
	              else{
	                // Scenario 2
	                currentPosition = currentPosition[index];
	              }
	            }
	            else{
	              currentPosition = currentPosition[right];
	            }
	          }
	        }
	      }
	      // end of displayFormat
	      else {
	        value = currentPosition[format[v]];
	        break;
	      }
	    }
	  }
	  // root level
	  else{
	    value = currentPosition[valueExpression];
	  }
	  return value;
	}

	function buildResultsTable() {
	  console.log("RESULTS");
	  console.log(results);
	  var result = results;
	  var queryEndpoint = document.getElementById("queryEndpointSelect").value;
	  if (result === undefined) {
	    document.getElementById("formatResults").innerHTML = "An error occurred. Check your query.";
	    return;
	  }

	  //Build GUID lists
	  for (c = 0; c < tableFormat.columns.length; c++) {
	    switch(tableFormat.columns[c].displayFormat){
	      case "Subquery":
	      case "GUID":
	        if (GUIDs[tableFormat.columns[c].displayName] === undefined){
	          GUIDs[tableFormat.columns[c].displayName] = {
	            "URL": tableFormat.columns[c].queryURL,
	            "index": 0,
	            "refreshed": false,
	            "idList": [],
	            "nameList": []
	          };
	        }
	        else{
	          GUIDs[tableFormat.columns[c].displayName].index = 0;
	        }
	        break;
	    }
	  }


	  table = [];
	  var tableIndex = 0;
	  var currentGUIDList = "";
	  var currentGUIDindex = 0;
	  // for each row in the table...for now I'm assuming I want the first group in the result set, grouping is by media type
	  switch(queryEndpoint){
	    case "conversationDetails":
	      for (var con = 0; con < result.conversations.length; con++) {
	        table[tableIndex] = [];        
	        buildResultsRow(result.conversations[con], result, tableIndex);
	        tableIndex++;
	      }
	      break;
	    case "conversationsAggregate":
	      for (r = 0; r < result.results.length; r++) {
	        // for each column in the table
	        for (var d = 0; d < result.results[r].data.length; d++) {
	          table[tableIndex] = [];
	          buildResultsRow(result.results[r].data[d], result.results[r], tableIndex);
	          tableIndex++;
	        }
	      }
	      break;
	  }
	}

	function buildResultsRow(element, parent, tableIndex){  
	  try {
	    // for each column in the results table
	    for (c = 0; c < tableFormat.columns.length; c++) {
	      var name = tableFormat.columns[c].displayName;
	      // cell value is an expression, not a literal
	      if(tableFormat.columns[c].valueExpression !== undefined && tableFormat.columns[c].displayFormat !== "Subquery"){
	        table[tableIndex][tableFormat.columns[c].displayIndex] = evaluateExpression(element, tableFormat.columns[c].valueExpression);
	      }
	      switch (tableFormat.columns[c].displayFormat) {
	        case "Interval":
	          var interval = element.interval.split("/");
	          var date1 = new Date(interval[0]);
	          var date2 = new Date(interval[1]);
	          table[tableIndex][tableFormat.columns[c].displayIndex] = convertInterval(date1, date2);
	          break;
	        case "Number":
	          //"valueExpression": "({{tTalk.sum}}+{{tAcd}})/{{nOffered.count}}"

	          //replace strings with values
	          var pattern = new RegExp("\{(.*?)\}", "g");
	          // number of replacement strings
	          var matchCount = tableFormat.columns[c].valueExpression.match(pattern).length;

	          // the equation
	          var columnValue = tableFormat.columns[c].valueExpression;

	          //replace strings with literal values
	          for (i = 0; i < matchCount; i++) {
	            // the name of the metric
	            var metricName = pattern.exec(columnValue)[1].split(".");
	            var metricValue = 0;

	            // get the metric value

	            for (m = 0; m < element.metrics.length; m++) {
	              if (element.metrics[m].metric == metricName[0]) {
	                metricValue = element.metrics[m].stats[metricName[1]];
	                continue;
	              }
	            }

	            // replace metric name with value
	            columnValue = columnValue.replace(columnValue.match(pattern)[0], metricValue);

	          }
	          // add value to table
	          try {
	            var num = eval(columnValue).toFixed(2);
	            if (Number.isNaN(Number(num))) {
	              num = 0;
	            }
	            table[tableIndex][tableFormat.columns[c].displayIndex] = num;
	          } catch (err) {
	            table[tableIndex][tableFormat.columns[c].displayIndex] = err;
	            console.log(err);
	          }
	          break;            
	        case "Subquery":
	          //var conversationId = result.conversations[con].conversationId;
	          var conversationId = element.conversationId;
	          // only add it to the list if it isn't in the list
	          if (subQueries.idList.indexOf(conversationId) < 0) {
	            refresh = true;
	            subQueries.valueList[subQueries.idList.length] = "";
	            subQueries.formatList[subQueries.idList.length] = tableFormat.columns[c].valueExpression;
	            subQueries.idList[subQueries.idList.length] = conversationId;                
	          } else if (subQueries.valueList[subQueries.idList.indexOf(conversationId)].length > 0) {
	            table[tableIndex][tableFormat.columns[c].displayIndex] = subQueries.valueList[subQueries.idList.indexOf(conversationId)];
	          } else {
	            table[tableIndex][tableFormat.columns[c].displayIndex] = "";
	          }
	          break;
	        case "GUID":
	          var GUID = table[tableIndex][tableFormat.columns[c].displayIndex];
	          var guidName = tableFormat.columns[c].displayName;
	          if (GUID === undefined){
	            GUID = "";
	          }
	          // This is for the Conversations Aggregate query where the location of the Queue ID is in the parent node (don't know how else to solve for this)
	          else if (GUID === undefined && tableFormat.columns[c].queryURL === "Queue"){
	            GUID = parent.group.queueId;
	          }
	          // only add it to the list if it isn't in the list
	          if (GUIDs[guidName].idList.indexOf(GUID) < 0) {
	            refresh = true;
	            GUIDs[guidName].nameList[GUIDs[guidName].idList.length] = "";
	            GUIDs[guidName].idList[GUIDs[guidName].idList.length] = GUID;                
	          } else if (GUIDs[guidName].nameList[GUIDs[guidName].idList.indexOf(GUID)].length > 0) {
	            table[tableIndex][tableFormat.columns[c].displayIndex] = GUIDs[guidName].nameList[GUIDs[guidName].idList.indexOf(GUID)];
	          } else {
	            refresh = true;
	            table[tableIndex][tableFormat.columns[c].displayIndex] = "";
	          }
	          break;
	      }
	    }
	  } catch (err2) {
	    console.log("Build Table Error: " + err2);
	    document.getElementById("formatResults").innerHTML = "Could not parse display format: " + tableFormat.columns[c].displayFormat + err2 + err2.stack;
	  }
	}

	function exportFunction() {
	  JSONToCSVConvertor(table, "export", true);
	}

	function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
	  //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

	  var CSV = '';
	  //Set Report title in first row or line

	  CSV += ReportTitle + '\r\n\n';

	  //This condition will generate the Label/Header
	  if (ShowLabel) {
	    var row = "";
	    //This loop will extract the label from 1st index of on array
	    for (var index in tableFormat.columns) {

	      //Now convert each value to string and comma-seprated
	      console.log(index);
	      row += tableFormat.columns[index].displayName + ',';
	    }

	    row = row.slice(0, -1);

	    //append Label row with line break
	    CSV += row + '\r\n';
	  }

	  //1st loop is to extract each row
	  for (var i = 0; i < arrData.length; i++) {
	    var row = "";

	    //2nd loop will extract each column and convert it in string comma-seprated
	    for (var index in arrData[i]) {
	      row += '"' + arrData[i][index] + '",';
	    }

	    row.slice(0, row.length - 1);

	    //add a line break after each row
	    CSV += row + '\r\n';
	  }

	  if (CSV == '') {
	    alert("Invalid data");
	    return;
	  }

	  //Generate a file name
	  var fileName = "MyReport_";
	  //this will remove the blank-spaces from the title and replace it with an underscore
	  fileName += ReportTitle.replace(/ /g, "_");

	  //Initialize file format you want csv or xls
	  var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

	  // Now the little tricky part.
	  // you can use either>> window.open(uri);
	  // but this will not work in some browsers
	  // or you will not get the correct file extension    

	  //this trick will generate a temp <a /> tag
	  var link = document.createElement("a");
	  link.href = uri;

	  //set the visibility hidden so it will not effect on your web-layout
	  link.style = "visibility:hidden";
	  link.download = fileName + ".csv";

	  //this part will append the anchor tag and remove it after automatic click
	  document.body.appendChild(link);
	  link.click();
	  document.body.removeChild(link);
	}
});
