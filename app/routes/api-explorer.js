import Ember from 'ember';
import { purecloudEnvironmentTld } from '../utils/purecloud-environment';
import platformClient from 'platformClient';

export default Ember.Route.extend({
	purecloud: Ember.inject.service(),
	accountManager: Ember.inject.service(),
	analyticsService: Ember.inject.service(),

	init() {
		this.get('purecloud');
		let that = this;
		function receiveMessage(event) {
			if (event.origin !== 'null' && event.origin !== window.location.origin) {
				//return;
			}

			// Note: Initializing a V2 chat triggers an event without a data property
			if (!event.data || typeof event.data === 'object') {
				return;
			}
			let data = JSON.parse(event.data);

			if (data.action === 'anaytics') {
				that.get('analyticsService').logExporerExecution(data.httpMethod, data.url);
			}
		}
		window.addEventListener('message', receiveMessage, false);
	},

	model() {
		let search = window.location.search;

		if (window.location.hash.indexOf('share') > 0) {
			search = '?' + window.location.hash.substring(window.location.hash.indexOf('share'));
		} else if (window.location.hash.indexOf('filter') > 0) {
			search = '?' + window.location.hash.substring(window.location.hash.indexOf('filter'));
		}

		let purecloudEnvironment = purecloudEnvironmentTld();
		const match = /^developer\.(.+)$/i.exec(window.location.hostname);
		let siteHost = match ? match[1] : 'genesys.cloud';

		// Build swagger url
		let swaggerUrl = `https://api.${purecloudEnvironment}/api/v2/docs/swagger`;

		// Determine override
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0] || '').toLowerCase() === 'swaggeroverride') {
				swaggerUrl = decodeURIComponent(pair[1]);
			}
		}

		let swagger =
			`openApiUrl=${swaggerUrl}&host=api.${purecloudEnvironment}&shareUrl=${window.location.origin}` +
			encodeURIComponent('/developer-tools/#/api-explorer?');

		if (search == null || search.length === 0) {
			search = '?' + swagger;
		} else {
			search += '&' + swagger;
		}

		//let openApiExplorerUrl = `http://localhost:4201/`;
		let openApiExplorerUrl = `https://developer.${siteHost}/openapi-explorer/index.html`;

		if (siteHost === 'ininsca.com') {
			//need to special case here
			openApiExplorerUrl = `https://apps.${siteHost}/openapi-explorer/`;
		}

		const selectedAccount = JSON.stringify(this.get('accountManager').get('selectedAccount'));

		return (
			`${openApiExplorerUrl}${search}#token_type=bearer&access_token=` +
			platformClient.ApiClient.instance.authData.accessToken +
			`&account=${encodeURIComponent(selectedAccount)}`
		);
	},
});
