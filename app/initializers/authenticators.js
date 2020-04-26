import config from '../config/environment';
import { purecloudEnvironment } from '../utils/purecloud-environment';
import { purecloudEnvironmentTld } from '../utils/purecloud-environment';
import platformClient from 'platformClient';

export default {
	name: 'authenticators',
	featureTogglesToQuery: ['archDevToolsScripting', 'relate.ui.useEmailAndPhoneForRWPLookupInWebChat'],
	/**
	 * Creates the query string to get all the feature toggles that Dev-center tools cares about.
	 * Creates this string based on the featureTogglesToQuery array
	 * @return {string} - the query string
	 * @private
	 */
	_createQueryString() {
		var queryString = '';
		this.featureTogglesToQuery.forEach(
			function(toggle) {
				queryString = queryString + 'feature=' + toggle + '&';
			}.bind(this)
		);
		return queryString;
	},

	initialize: function(application) {
		application.deferReadiness();

		const env = purecloudEnvironmentTld();
		const oauthConfig = config.oauthProps[purecloudEnvironment()];
		const client = platformClient.ApiClient.instance;
		const state = encodeURIComponent(window.location.href.replace(/=/g, '|'));
		let returnedState;

		client.setPersistSettings(true, 'purecloud-dev-tools-auth');
		client.setEnvironment(env);

		// Authenticate
		client
			.loginImplicitGrant(oauthConfig.clientId, oauthConfig.redirect, { state: state })
			.then((data) => {
				// Store returned state
				returnedState = data.state;

				// Makes call to platform api to get the feature toggles for the user that is logged in.
				return $.ajax({
					url: `https://apps.${env}/platform/api/v2/featuretoggles?` + this._createQueryString(),
					type: 'GET',
					dataType: 'json',
					headers: {
						Authorization: `bearer ${data.accessToken}`
					}
				});
			})
			.then((data) => {
				if (!data) {
					return;
				}
				for (var key in data) {
					try {
						// Can't use storage-service yet since this is in the initializer
						window.localStorage['developertools-' + key] = data[key];
					} catch (error) {
						console.log('Could not write feature toggle to local storage: ' + key);
					}
				}

				application.advanceReadiness();
				//debugger;
				var redirectTo = decodeURIComponent(returnedState).replace(/\|/g, '=');

				if (redirectTo && redirectTo !== 'null' && redirectTo !== window.location.href) {
					window.location.replace(redirectTo);
				}
			})
			.catch((err) => {
				console.log('Could not get feature toggles');
				console.log(err);
			});
	}
};
