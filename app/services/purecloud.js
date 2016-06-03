/* global PureCloudSession */
/* global NotificationsApi */

import Ember from 'ember';

export default Ember.Service.extend({
    session: null,
    notificationsApi(){
        return new NotificationsApi(this.get('session'));
    },
    me: null,

    init() {
        this._super(...arguments);

        var session = new PureCloudSession();

        var that = this;
        session.authorize('df475b64-4f4e-4f28-8fd1-eab47511e7da','http://localhost:4200/notificationtester')
                .done(function(me){

                    console.log('auth done');
                    console.log(me);
                    that.set('me',me);
                });

        this.set('session', session);
    //    application.register('service:purecloud', purecloud);
    //    application.inject('route', 'purecloud', 'service:purecloud');


    },
});
