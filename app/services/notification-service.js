/* global moment */
import Ember from 'ember';
//http://www.programwitherik.com/ember-services-tutorial/
export default Ember.Service.extend({
	socketService: Ember.inject.service('websockets'),
	purecloud: Ember.inject.service(),
	analyticsService: Ember.inject.service(),

	idList: [],
	availableTopics: [],
	websocketMessages: [],
	socketRef: null,
	channelId: null,
	isPinned: false,

	init() {
		this._super(...arguments);

		let self = this;

		var api = self.get('purecloud').notificationsApi();

		api.postNotificationsChannels().then(function(channel) {
			if (!(self.get('isDestroyed') || self.get('isDestroying'))) {
				const socket = self.get('socketService').socketFor(channel.connectUri);

				socket.on('open', self.websocketOpenHandler, self);
				socket.on('message', self.websocketMessageHandler, self);

				self.set('socketRef', socket);
				self.set('channelId', channel.id);
			}
		});

		api
			.getNotificationsAvailabletopics({
				expand: ['description', 'schema']
			})
			.then(function(topics) {
				if (!(self.get('isDestroyed') || self.get('isDestroying'))) {
					self.set('availableTopics', topics.entities);
				}
			});
	},
	subscribe(id) {
		let versionlessId = id.replace('v2.', '');
		this.get('analyticsService').logNotificationRegistration(versionlessId.split('.')[0]);

		var that = this;
		var api = this.get('purecloud').notificationsApi();
		api
			.postNotificationsChannelSubscriptions(this.get('channelId'), [{ id: id }])
			.then(function() {
				that.get('idList').pushObject(id);
			})
			.catch(function(error) {
				console.log(error);
			});
	},
	unsubscribeAll() {
		var that = this;
		var api = this.get('purecloud').notificationsApi();
		api
			.putNotificationsChannelSubscriptions(this.get('channelId'), [])
			.then(function() {
				that.get('idList').clear();
			})
			.catch(function(error) {
				console.log(error);
			});
	},

	websocketOpenHandler(event) {
		console.log('On open event has been called: ', event);
	},

	websocketMessageHandler(event) {
		console.log(`Message: ${event.data}`);
		var eventData = JSON.parse(event.data);

		eventData.bodyString = JSON.stringify(eventData.eventBody, null, ' ');
		eventData.time = moment().format('h:mm:ss.SSS');

		this.get('websocketMessages').pushObject(eventData);
	},
	togglePin() {
		this.toggleProperty('isPinned');
	}
});
