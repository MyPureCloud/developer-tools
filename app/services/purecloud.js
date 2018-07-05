/* global purecloud */
import Ember from 'ember';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

export default Ember.Service.extend(Ember.Evented, {
    session: null,

    notificationsApi(){
        return new purecloud.platform.NotificationsApi(this.get('session'));
    },
    presenceApi(){
        return new purecloud.platform.PresenceApi(this.get('session'));
    },
    analyticsApi(){
        return new purecloud.platform.AnalyticsApi(this.get('session'));
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
    usersApi(){
        return new purecloud.platform.UsersApi(this.get('session'));
    },
    me: null,

    init() {
        this._super(...arguments);

        let purecloudEnvironment = purecloudEnvironmentTld();

        window.purecloud = purecloud;

        var session = new purecloud.platform.PureCloudSession({
          strategy: 'token',
          environment: purecloudEnvironment,
          storageKey:  'purecloud-dev-tools-auth'
        });

        var that = this;
        var api = new purecloud.platform.UsersApi(session);

        api.getMe('geolocation,station,date,geolocationsettings,organization,presencedefinitions,token').then(function(me){
            that.set('me',me);
        }).catch(function(error){
            console.error(error);
        });

        this.set('session', session);
    },
});
