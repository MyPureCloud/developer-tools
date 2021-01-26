import config from '../config/environment';
import { purecloudEnvironment } from '../utils/purecloud-environment';
import { purecloudEnvironmentTld } from '../utils/purecloud-environment';
import platformClient from 'platformClient';

export default {
	name: 'authenticators',
	featureTogglesToQuery: ['archDevToolsScripting'],
	environment: 'environment',
	/**
	 * Creates the query string to get all the feature toggles that Dev-center tools cares about.
	 * Creates this string based on the featureTogglesToQuery array
	 * @return {string} - the query string
	 * @private
	 */
	_createQueryString() {
		var queryString = '';
		this.featureTogglesToQuery.forEach(
			function (toggle) {
				queryString = queryString + 'feature=' + toggle + '&';
			}.bind(this)
		);
		return queryString;
	},

	authenticate(client, oauthConfig, state, application) {

		let returnedState;

		// Authenticate
		client
		.loginImplicitGrant(oauthConfig.clientId, oauthConfig.redirect, { state: state })
		.then((data) => {
			window.localStorage.setItem(this.environment, client.environment);
			// Store returned state
			returnedState = data.state;

			// Makes call to platform api to get the feature toggles for the user that is logged in.
			return $.ajax({
				url: `https://apps.${client.environment}/platform/api/v2/featuretoggles?` + this._createQueryString(),
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
			var returnedStateObj = JSON.parse(decodeURIComponent(returnedState).replace(/\|/g, '='));
			var redirectTo = returnedStateObj.redirectUrl;

			if (redirectTo && redirectTo !== 'null' && redirectTo !== window.location.href) {
				window.location.replace(redirectTo);
			}
		})
		.catch((err) => {
			console.log('Could not get feature toggles');
			console.log(err);
		});
	},

	initialize: function (application) {
		application.deferReadiness();

		const oauthConfig = config.oauthProps[purecloudEnvironment()];
		const client = platformClient.ApiClient.instance;
		client.setPersistSettings(true, 'purecloud-dev-tools-auth');
		var env;
		
		var url = window.location.href;
		var stateStr = decodeURIComponent(decodeURIComponent(url));

		if (stateStr.includes("state")) { // Check if the url has state in it. If so, means authenticated, then check for environment
			stateStr = stateStr.substring(stateStr.indexOf("{"), stateStr.lastIndexOf("&")); // Extract state from url for JSON parse

			var preStateObj = JSON.parse(stateStr);
	
			if(preStateObj.environment) {
				env = preStateObj.environment;
			} else {
				env = purecloudEnvironmentTld();
			}
		} else {
			env = purecloudEnvironmentTld();
		}

		if (!env || env === "null") { // type of variable "env" is string, so needs to check "null" instead of null
			var that = this;
			document.getElementById("regionModal").style.display = "block";
			$('.regionButton').on("click", function () {
				env = $(this).attr("value");

				var stateObj = {
					redirectUrl: window.location.href.replace(/=/g, '|'),
					environment: env
				}
				var state = JSON.stringify(stateObj);
				client.setEnvironment(env);
				that.authenticate(client, oauthConfig, state, application);
			})
		} else {
			document.getElementById("regionModal").style.display = "none";

			var stateObj = {
				redirectUrl: window.location.href.replace(/=/g, '|'),
				environment: env
			}
			var state = JSON.stringify(stateObj);
			client.setEnvironment(env);
			this.authenticate(client, oauthConfig, state, application);
		}
	}
};