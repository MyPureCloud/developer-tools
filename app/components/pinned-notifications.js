/* global $ */
import Ember from 'ember';
var  computed = Ember.computed;

export default Ember.Component.extend({
    notificationService: Ember.inject.service(),
    visible: false,
    viewedMessages: 0,
    isPinned: computed('notificationService.isPinned', function(){
        return this.get("notificationService").get("isPinned");
    }),
    modelObserver: function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            if($(".pinned-notification-message").last()){
                $(".pinned-notification-message").last().get(0).scrollIntoView();
            }
        });
    }.observes('receivedMessage.@each'),
    init(){
        this._super(...arguments);
        this.get('notificationService');
    },
    receivedMessage: computed('notificationService.websocketMessages', function() {
        let messages = this.get('notificationService').get('websocketMessages');

        return messages;
    }),
    unreadCount: computed('notificationService.websocketMessages.length', 'visible', "viewedMessages", function() {
        let messages = this.get('notificationService').get('websocketMessages');

        if(this.get("visible")){
            return "0";
        }else{
            return messages.length - this.get("viewedMessages");
        }

    }),
    actions:{
        toggleVisible(){
            this.toggleProperty('visible');
            this.set("viewedMessages", this.get("receivedMessage").length);
        }
    }
});
