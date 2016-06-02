export function initialize(application) {
    var session = new PureCloudSession();
    var purecloud = Ember.Object.extend({
        session() {
          return session;
      },
      notificationsApi(){
          return new NotificationsApi(this.get('session'));
      }

      });

    session.authorize('df475b64-4f4e-4f28-8fd1-eab47511e7da','http://localhost:4200/notificationtester')
                    .done(function(){});

    application.register('service:purecloud', purecloud)
    application.inject('route', 'purecloud', 'service:purecloud');

}

export default {
  name: 'purecloud-session',
  initialize
};
