/* global purecloud */
/* global $ */
import config from '../config/environment';
import {purecloudEnvironment} from '../utils/purecloud-environment';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

export default {
    name: 'authenticators',
    featureTogglesToQuery: ['archDevToolsScripting'],
  /**
   * Creates the query string to get all the feature toggles that Dev-center tools cares about.
   * Creates this string based on the featureTogglesToQuery array
   * @return {string} - the query string
   * @private
   */
    _createQueryString() {
      var queryString = '';
      this.featureTogglesToQuery.forEach( function (toggle) {
        queryString = queryString + 'feature=' + toggle + '&';
      }.bind(this));
      return queryString;
    },

    initialize: function (application) {
        let oauthConfig = config.oauthProps[purecloudEnvironment()];

        let state = encodeURIComponent(window.location.href.replace(/=/g,"|"));

        let env = purecloudEnvironmentTld();

        var session = new purecloud.platform.PureCloudSession({
          strategy: 'implicit',
          clientId: oauthConfig.clientId,
          redirectUrl: oauthConfig.redirect,
          environment: env,
          state: state,
          storageKey: 'purecloud-dev-tools-auth'
        });

        application.deferReadiness();

        let loginPromise = session.login();

        loginPromise.then(function(){
          // Makes call to platform api to get the feature toggles for the user that is logged in.
          $.ajax({
            url: 'https://apps.'+env+'/platform/api/v2/featuretoggles?' + this._createQueryString(),
            type: 'GET',
            dataType: 'json',
            success: function (data) {
              if (!data) { return; }
              for (var key in data) {
                try {
                  // Can't use storage-service yet since this is in the initializer
                  window.localStorage['developertools-' + key] = data[key];
                } catch (error) {
                  console.log('Could not write feature toggle to local storage: ' + key);
                }
              }
            }.bind(this),
            error: function () {
             console.log('Could not get feature toggles');
            },
            complete: function () {
              application.advanceReadiness();
              //debugger;
              var redirectTo = decodeURIComponent(session.options.state).replace(/\|/g,"=");

              if(redirectTo && redirectTo !== "null" && redirectTo !== window.location.href){
                window.location.replace(redirectTo);
              }
            },
            headers: {
              "Authorization": "bearer " + session.options.token
            }
          });
        }.bind(this));
    }
};
