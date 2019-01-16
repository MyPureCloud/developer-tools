import Ember from 'ember';
import platformClient from 'platformClient';

const SECURITY_NAME = 'PureCloud Auth';

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
	orgAuthorizationApi(){
		return new platformClient.OrganizationAuthorizationApi();
	},
	usersApi(){
		return new platformClient.UsersApi();
	},
	webChatApi(){
		return new platformClient.WebChatApi();
	},
	oauthApi(){
		return new platformClient.OAuthApi();
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
			[SECURITY_NAME], 
			['application/json'], 
			['application/json']
		);
	},
	getResource(path, queryParams) {
		return platformClient.ApiClient.instance.callApi(
			path, 
			'GET', 
			{  }, 
			queryParams,
			{  }, 
			{  }, 
			null, 
			[SECURITY_NAME], 
			['application/json'], 
			['application/json']
		);
	},
	post(path, body) {
		return platformClient.ApiClient.instance.callApi(
			path, 
			'POST', 
			{  }, 
			{  },
			{  }, 
			{  }, 
			body, 
			[SECURITY_NAME], 
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
				'token',
				'trustors'
			]})
			.then((me) => {
				this.set('me', me);
				this.set('accessToken', platformClient.ApiClient.instance.authData.accessToken);
				this.set('environment', platformClient.ApiClient.instance.environment);
			})
			.catch((err) => console.error(err));
	},
});
