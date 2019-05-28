import Ember from 'ember';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';
import platformClient from 'platformClient';

export default Ember.Route.extend({
    purecloud: Ember.inject.service(),
    analyticsService: Ember.inject.service(),

    init(){
        let that = this;
        function receiveMessage(event)
        {
            if (event.origin !== "null" && event.origin !== window.location.origin) {
                //return;
            }

            // Note: Initializing a V2 chat triggers an event without a data property
            if(!event.data ||typeof(event.data) === 'object'){
                return;
            }
            let data = JSON.parse(event.data);

            if(data.action === 'anaytics'){
                that.get("analyticsService").logExporerExecution(data.httpMethod, data.url);
            }

        }
        window.addEventListener("message", receiveMessage, false);
    },

    model(){

        let search = window.location.search;

        if(window.location.hash.indexOf("share")>0){
            search = "?" + window.location.hash.substring(window.location.hash.indexOf("share"));
        }else if(window.location.hash.indexOf("filter")>0){
            search = "?" + window.location.hash.substring(window.location.hash.indexOf("filter"));
        }

        let purecloudEnvironment = purecloudEnvironmentTld();

        let swaggerUrl = `https://api.${purecloudEnvironment}/api/v2/docs/swagger`;
        swaggerUrl = `/swagger-schema/publicapi-v2-latest.json`;

        let swagger = `openApiUrl=${swaggerUrl}&host=api.${purecloudEnvironment}&shareUrl=${window.location.origin}` + encodeURIComponent('/developer-tools/#/api-explorer?');

        if(search == null || search.length === 0){
            search = "?"+swagger;
        }else{
            search += "&" + swagger;
        }

        let openApiExplorerUrl = `https://developer.${purecloudEnvironment}/openapi-explorer/index.html`;

        if(purecloudEnvironment === 'ininsca.com'){
            //need to special case here
            openApiExplorerUrl = `https://apps.${purecloudEnvironment}/openapi-explorer/`;
        }

        //openApiExplorerUrl = 'http://localhost:8081/';
        return `${openApiExplorerUrl}${search}#token_type=bearer&access_token=` + platformClient.ApiClient.instance.authData.accessToken;

    }
});
