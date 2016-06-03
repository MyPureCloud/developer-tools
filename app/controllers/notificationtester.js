import Ember from 'ember';
var  computed = Ember.computed;

export default Ember.Controller.extend({
    purecloud: Ember.inject.service('purecloud'),
    notificationService: Ember.inject.service(),
    topic: null,
    subscribeId: null,

    init(){
        this.get('notificationService');
    },
    subscriptions: computed('notificationService.idList', function() {
        return this.get('notificationService').get('idList');
    }),
    availableTopics: computed('notificationService.availableTopics', function() {
        return this.get('notificationService').get('availableTopics');
    }),
    receivedMessage: computed('notificationService.websocketMessages', function() {
        return this.get('notificationService').get('websocketMessages');
    }),
    actions: {

        selectNotificationTopic(topicIndex) {
            let topic = this.get('availableTopics')[topicIndex];

            let selectedTopic = topic;
            selectedTopic.schemaString = JSON.stringify(topic.schema, null, "  ");

            this.set('topic', selectedTopic);
            this.set('subscribeId', selectedTopic.id);
        },
        subscribe(){
            this.get("notificationService").subscribe(this.get("subscribeId"));
        }
    }

});
