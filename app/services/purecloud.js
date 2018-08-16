import Ember from 'ember';
import platformClient from 'platformClient';

export default Ember.Service.extend(Ember.Evented, {
	session: null,

	notificationsApi(){
		return new platformClient.NotificationsApi();
	},
	presenceApi(){
		return new platformClient.PresenceApi();
	},
	analyticsApi(){
		return new platformClient.AnalyticsApi();
	},
	orgApi(){
		return new platformClient.OrganizationApi();
	},
	routingApi(){
		return new platformClient.RoutingApi();
	},
	conversationsApi(){
		return new platformClient.ConversationsApi();
	},
	usersApi(){
		return new platformClient.UsersApi();
	},
	webChatApi(){
		return new platformClient.WebChatApi();
	},
	// Intended to be used with a path only for URLs at api.{env}
	getMore(path, queryParams) {
		return platformClient.ApiClient.instance.callApi(
			path, 
			'GET', 
			{  }, 
			queryParams,
			{  }, 
			{  }, 
			null, 
			['PureCloud Auth'], 
			['application/json'], 
			['application/json']
		);
	},
	logout() {
		console.log('logging out');
		platformClient.ApiClient.instance.logout();
	},
	me: null,

	init() {
		this._super(...arguments);

		this.usersApi().getUsersMe({ 
			expand: [
				'geolocation',
				'station',
				'date',
				'geolocationsettings',
				'organization',
				'presencedefinitions',
				'token' 
			]})
			.then((me) => {
				this.set('me', me);
				this.set('accessToken', platformClient.ApiClient.instance.authData.accessToken);
				this.set('environment', platformClient.ApiClient.instance.environment);
			})
			.catch((err) => console.error(err));
	},
});
