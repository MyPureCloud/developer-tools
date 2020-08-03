import Ember from 'ember';
import platformClient from 'platformClient';

const SECURITY_NAME = 'PureCloud OAuth';

export default Ember.Service.extend(Ember.Evented, {
	session: null,

	notificationsApi() {
		return {
			postNotificationsChannels: () => new Promise((resolve) => resolve({connectUri: "wss://www.google.com"})),
			getNotificationsAvailabletopics: () => new Promise((resolve) => resolve({})),
		};
	},
	presenceApi() {
		return {};
	},
	analyticsApi() {
		return {};
	},
	orgApi() {
		return {
			getOrganizationsMe:  () => new Promise((resolve) => resolve({})),
		};
	},
	routingApi() {
		return {};
	},
	conversationsApi() {
		return {};
	},
	orgAuthorizationApi() {
		return {};
	},
	usersApi() {
		return {
			getUsersMe: () => new Promise((resolve) => resolve({})),
		};
	},
	webChatApi() {
		return {};
	},
	widgetsApi() {
		return {};
	},
	oauthApi() {
		return {};
	},
	tokensApi() {
		return {};
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
	logout() {
		console.log('logging out');
		this.tokensApi()
			.deleteTokensMe()
			.then(() => {
				console.log('token destroyed');
				window.localStorage.removeItem('purecloud_dev_tools_auth_auth_data');
				platformClient.ApiClient.instance.logout();
			})
			.catch(console.error);
	},
	me: null,
	isStandalone: true,

	init() {
		this._super(...arguments);
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
