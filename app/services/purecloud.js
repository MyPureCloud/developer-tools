/* global purecloud */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend(Ember.Evented, {
    session: null,
    environmentService: Ember.inject.service(),

    notificationsApi(){
        return new purecloud.platform.NotificationsApi(this.get('session'));
    },
    orgApi(){
        return new purecloud.platform.OrganizationApi(this.get('session'));
    },
    routingApi(){
        return new purecloud.platform.RoutingApi(this.get('session'));
    },
    me: null,

    init() {
        this._super(...arguments);

        let oauthConfig = config.oauthProps[this.get("environmentService").purecloudEnvironment()];

        let state = encodeURIComponent(window.location.href.replace(/=/g,"|"));

        let purecloudEnvironment = this.get("environmentService").purecloudEnvironmentTld();

        var session = new purecloud.platform.PureCloudSession({
          strategy: 'implicit',
          clientId: oauthConfig.clientId,
          redirectUrl: oauthConfig.redirect,
          environment: purecloudEnvironment,
          state: state,
          storageKey: 'purecloud-dev-tools'
        });

        var that = this;

        let loginPromise = session.login();

        loginPromise.then(function(){
            //debugger;
            var redirectTo = decodeURIComponent(session.options.state).replace(/\|/g,"=");
            if(redirectTo && redirectTo !== "null" && redirectTo !== window.location.href){
                window.location.replace(redirectTo);
                return;
            }

            //Get All Me Expands
            var api = new purecloud.platform.UsersApi(session);

            api.getMe('geolocation,station,date,geolocationsettings,organization,presencedefinitions').then(function(me){
                that.set('me',me);
            });

            that.trigger('authenticated');
        });

        this.set('session', session);
    },
});
