import Ember from 'ember';
import config from '../config/environment';
import {purecloudEnvironment} from '../utils/purecloud-environment';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

export default {
    name: 'authenticators',
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
            application.advanceReadiness();

            //debugger;
            var redirectTo = decodeURIComponent(session.options.state).replace(/\|/g,"=");

            if(redirectTo && redirectTo !== "null" && redirectTo !== window.location.href){
                window.location.replace(redirectTo);
            }
        });
    }
};
