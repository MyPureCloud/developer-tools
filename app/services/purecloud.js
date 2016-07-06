/* global purecloud */
import Ember from 'ember';
import config from '../config/environment';

const ENV_REG_EXP = /(inin[dts]ca|mypurecloud|localhost)/i;

export default Ember.Service.extend(Ember.Evented, {
    session: null,
    notificationsApi(){
        return new purecloud.platform.NotificationsApi(this.get('session'));
    },
    me: null,

    init() {
        this._super(...arguments);

        let env = ENV_REG_EXP.exec(window.location.hostname)[0];

        let oauthConfig = config.oauthProps[env];

        let purecloudEnvironment = env + ".com";

        if(env === 'localhost'){
            purecloudEnvironment = "inindca.com";
        }

        let state = encodeURIComponent(window.location.href.replace(/=/g,"|"));

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
