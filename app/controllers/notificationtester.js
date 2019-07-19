/* global $ */
import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Controller.extend({
	purecloud: Ember.inject.service('purecloud'),
	notificationService: Ember.inject.service(),
	topic: null,
	subscribeId: null,
	modelObserver: function() {
		Ember.run.scheduleOnce('afterRender', this, function() {
			if (
				$('.notification-message')
					.last()
					.offset()
			) {
				var top = $('.notification-message')
					.last()
					.offset().top;
				$('#notification-panel').scrollTop(top);
			}
		});
	}.observes('receivedMessage.@each'),

	init() {
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
	isPinned: computed('notificationService.isPinned', function() {
		return this.get('notificationService').get('isPinned');
	}),
	isStandalone: computed('purecloud.isStandalone', function() {
		return this.get('purecloud.isStandalone');
	}),
	actions: {
		selectNotificationTopic(topicIndex) {
			let topic = this.get('availableTopics')[topicIndex];

			let selectedTopic = topic;

			if (typeof topic === 'undefined') {
				this.set('topic', null);
				this.set('subscribeId', null);
				return;
			}
			selectedTopic.schemaString = JSON.stringify(topic.schema, null, '  ');

			this.set('topic', selectedTopic);
			this.set('subscribeId', selectedTopic.id);
		},
		subscribe() {
			this.get('notificationService').subscribe(this.get('subscribeId'));
		},
		subscribeToPresence() {
			let me = this.get('purecloud').me;

			this.get('notificationService').subscribe(`v2.users.${me.id}.presence`);
		},
		subscribeToConversations() {
			let me = this.get('purecloud').me;

			this.get('notificationService').subscribe(`v2.users.${me.id}.conversations`);
		},
		togglePin() {
			this.get('notificationService').togglePin();
		},
		clearNotifications() {
			this.get('notificationService').set('websocketMessages', []);
		}
	}
});
