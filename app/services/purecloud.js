import Ember from 'ember';
import platformClient from 'platformClient';

const SECURITY_NAME = 'PureCloud OAuth';

export default Ember.Service.extend({
	session: null,

	notificationsApi() {
		return new platformClient.NotificationsApi();
	},
	presenceApi() {
		return new platformClient.PresenceApi();
	},
	analyticsApi() {
		return new platformClient.AnalyticsApi();
	},
	orgApi() {
		return new platformClient.OrganizationApi();
	},
	routingApi() {
		return new platformClient.RoutingApi();
	},
	conversationsApi() {
		return new platformClient.ConversationsApi();
	},
	orgAuthorizationApi() {
		return new platformClient.OrganizationAuthorizationApi();
	},
	usersApi() {
		return new platformClient.UsersApi();
	},
	webChatApi() {
		return new platformClient.WebChatApi();
	},
	widgetsApi() {
		return new platformClient.WidgetsApi();
	},
	oauthApi() {
		return new platformClient.OAuthApi();
	},
	tokensApi() {
		return new platformClient.TokensApi();
	},
	// Intended to be used with a path only for URLs at api.{env}
	getMore(path, queryParams) {
		return platformClient.ApiClient.instance.callApi(
			path,
			'GET',
			{},
			queryParams,
			{},
			{},
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
			{},
			queryParams,
			{},
			{},
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
			{},
			{},
			{},
			{},
			body,
			[SECURITY_NAME],
			['application/json'],
			['application/json']
		);
	},

	// logout() {
	// 	console.log('logging out');
	// 	this.tokensApi()
	// 		.deleteTokensMe()
	// 		.then(() => {
	// 			console.log('token destroyed');
	// 			window.localStorage.removeItem('purecloud_dev_tools_auth_auth_data');
	// 			window.localStorage.removeItem('accounts');
	// 			window.localStorage.removeItem('selected');
	// 			window.localStorage.removeItem('initiated');
	// 			platformClient.ApiClient.instance.logout();
	// 		})
	// 		.catch(console.error);
	// },
	me: null,
	isStandalone: true,

	setSelected(selectedAccount) {
		platformClient.ApiClient.instance.setEnvironment(selectedAccount.environment);
		platformClient.ApiClient.instance.setAccessToken(selectedAccount.token);
		this.usersApi()
			.getUsersMe({
				expand: ['geolocation', 'station', 'date', 'geolocationsettings', 'organization', 'presencedefinitions', 'token', 'trustors'],
			})
			.then((me) => {
				this.set('me', me);
				this.set('accessToken', platformClient.ApiClient.instance.authData.accessToken);
				this.set('environment', platformClient.ApiClient.instance.environment);
			})
			.catch((err) => console.error(err));
	},

	init() {
		this._super(...arguments);
		let storage = window.localStorage;
		let selectedAccount = JSON.parse(storage.getItem('selectedAccount'));
		platformClient.ApiClient.instance.setEnvironment(selectedAccount.environment);
		platformClient.ApiClient.instance.setAccessToken(selectedAccount.token);

		this.set('isStandalone', window.location === window.parent.location);

		this.usersApi()
			.getUsersMe({
				expand: ['geolocation', 'station', 'date', 'geolocationsettings', 'organization', 'presencedefinitions', 'token', 'trustors'],
			})
			.then((me) => {
				this.set('me', me);
				this.set('accessToken', platformClient.ApiClient.instance.authData.accessToken);
				this.set('environment', platformClient.ApiClient.instance.environment);
			})
			.catch((err) => console.error(err));
	},
});
