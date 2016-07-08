/* globals ga */
import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    init: function(){
        this._super(...arguments);
        if(config.analyticsTrackingId){
            ga('create', config.analyticsTrackingId, 'none');
        }
    },
    didTransition: function() {

        this._super(...arguments);
        if(config.analyticsTrackingId){
            Ember.run.schedule('afterRender', () => {
                ga('set', 'page', "/tools" + this.get('url'));
                ga('send', 'pageview');
            });
        }

        return;
    }
});

Router.map(function() {
  this.route('notificationtester');
  this.route('api-explorer');
  this.route('codeeditor');
  this.route('webchat');
});

export default Router;
