const ENV_REG_EXP = /inin[dt]ca\..*|mypurecloud\..*|localhost|usw2.pure.cloud/i;
import config from '../config/environment';

function purecloudEnvironmentTld() {
	let env = ENV_REG_EXP.exec(window.location.hostname)[0];

	if (env === 'localhost') {
		env = 'inindca.com';
	}

	return env;
}

function purecloudEnvironment() {
	return window.location.hostname.replace(/\./g, '');
}

function architectRegion() {
	return config.oauthProps[purecloudEnvironment()].architectEnumString;
}

export { architectRegion, purecloudEnvironmentTld, purecloudEnvironment };
