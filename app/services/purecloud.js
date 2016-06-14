/* global PureCloudSession */
/* global NotificationsApi */
/* global UsersApi */
import Ember from 'ember';
import config from '../config/environment';

const ENV_REG_EXP = /(inin[dts]ca|mypurecloud|localhost)/i;

export default Ember.Service.extend({
    session: null,
    notificationsApi(){
        return new NotificationsApi(this.get('session'));
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

        var session = new PureCloudSession(purecloudEnvironment);

        var that = this;
        let state = encodeURIComponent(window.location.href.replace(/=/g,"|"));
        
        session.authorize(oauthConfig.clientId, oauthConfig.redirect, state)
                .done(function(){
                    //debugger;
                    var redirectTo = decodeURIComponent(session.getState()).replace(/\|/g,"=");
                    console.log("redirect to " + redirectTo);
                    if(redirectTo && redirectTo != "null" && redirectTo != window.location.href){
                        window.location.replace(redirectTo);
                    }

                    //Get All Me Expands
                    var api = new UsersApi(session);

                    api.getMe('geolocation,station,date,geolocationsettings,organization,presencedefinitions').done(function(me){
                        console.log('auth done');
                        console.log(me);
                        that.set('me',me);
                    });

                });

        this.set('session', session);
    },
});
