import config from '../config/environment';

function purecloudEnvironmentTld() {
	let storage = window.localStorage;
	let selectedAccount = JSON.parse(storage.getItem('selectedAccount'));
	let env = selectedAccount.environment;
	return env;
}

function purecloudEnvironment() {
	return window.location.hostname.replace(/\W/g, '');
}

function architectRegion() {
	return config.oauthProps[purecloudEnvironment()].architectEnumString;
}

export { architectRegion, purecloudEnvironmentTld, purecloudEnvironment };
