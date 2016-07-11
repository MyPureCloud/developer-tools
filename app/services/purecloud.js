/* global purecloud */
import Ember from 'ember';

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

        let purecloudEnvironment = this.get("environmentService").purecloudEnvironmentTld();

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

        that.trigger('authenticated');
        this.set('session', session);
    },
});
