/* global PureCloudSession */
/* global NotificationsApi */

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

        let purecloudEnvironment = env + ".com"

        if(env == 'localhost'){
            purecloudEnvironment = "inindca.com";
        }

        var session = new PureCloudSession(purecloudEnvironment);

        var that = this;
        session.authorize(oauthConfig.clientId, oauthConfig.redirect)
                .done(function(me){

                    console.log('auth done');
                    console.log(me);
                    that.set('me',me);
                });

        this.set('session', session);
    },
});
