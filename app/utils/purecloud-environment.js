const ENV_REG_EXP = /mypurecloud\.[a-z0-9.]{2,6}$|[a-z0-9]{4,5}.pure.cloud|inin[a-z0-9]{3}\.com|localhost/i;
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
