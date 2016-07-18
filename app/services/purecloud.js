/* global purecloud */
import Ember from 'ember';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

export default Ember.Service.extend(Ember.Evented, {
    session: null,

    notificationsApi(){
        return new purecloud.platform.NotificationsApi(this.get('session'));
    },
    orgApi(){
        return new purecloud.platform.OrganizationApi(this.get('session'));
    },
    routingApi(){
        return new purecloud.platform.RoutingApi(this.get('session'));
    },
    conversationsApi(){
        return new purecloud.platform.ConversationsApi(this.get('session'));
    },
    me: null,

    init() {
        this._super(...arguments);

        let purecloudEnvironment = purecloudEnvironmentTld();

        var session = new purecloud.platform.PureCloudSession({
          strategy: 'token',
          environment: purecloudEnvironment,
          storageKey:  'purecloud-dev-tools-auth'
        });

        var that = this;
        var api = new purecloud.platform.UsersApi(session);

        api.getMe('geolocation,station,date,geolocationsettings,organization,presencedefinitions').then(function(me){
            that.set('me',me);
        }).catch(function(error){
            console.error(error);
        });

        this.set('session', session);
    },
});
