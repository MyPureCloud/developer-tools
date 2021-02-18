import config from '../config/environment';

function purecloudEnvironmentTld() {

	let storage = window.localStorage;
	let env = storage.getItem("environment");

	return env;
}

function purecloudEnvironment() {
	return window.location.hostname.replace(/\W/g, '');
}

function architectRegion() {
	return config.oauthProps[purecloudEnvironment()].architectEnumString;
}

export { architectRegion, purecloudEnvironmentTld, purecloudEnvironment };
