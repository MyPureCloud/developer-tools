/* jshint node: true */

var pkg = require('../package.json');

module.exports = function (environment) {
	var ENV = {
		modulePrefix: 'developer-tools',
		environment: environment,
		baseURL: '/',
		locationType: 'auto',
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
			},
		},
		contentSecurityPolicy: {
			'connect-src': "'self' https://*.nr-data.net",
			'img-src': "'self' https://*.nr-data.net",
			'script-src': "'self' http://*.newrelic.com https://*.nr-data.net http://*.nr-data.net",
		},
		APP: {
			version: pkg.version,
			semver: pkg.version + '-edge',
			urlprefix: '',
		},
		oauthProps: {
			localhost: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://localhost:4200/',
				region: 'dev',
				architectEnumString: 'archEnums.LOCATIONS.dev',
			},
			appsinindcacom: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.inindca.com/developer-tools/',
				region: 'dev',
				architectEnumString: 'archEnums.LOCATIONS.dev',
			},
			appsinintcacom: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.inintca.com/developer-tools/',
				region: 'test',
				architectEnumString: 'archEnums.LOCATIONS.test',
			},
			developerinindcacom: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.inindca.com/developer-tools/',
				region: 'dev',
				architectEnumString: 'archEnums.LOCATIONS.dev',
			},
			developerinintcacom: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.inintca.com/developer-tools/',
				region: 'test',
				architectEnumString: 'archEnums.LOCATIONS.test',
			},
			developermypurecloudcom: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.mypurecloud.com/developer-tools/',
				region: 'prod',
				architectEnumString: 'archEnums.LOCATIONS.prod_us_east_1',
			},
			developermypurecloudie: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.mypurecloud.ie/developer-tools/',
				region: 'eu-west-1',
				architectEnumString: 'archEnums.LOCATIONS.prod_eu_west_1',
			},
			developermypurecloudcomau: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.mypurecloud.com.au/developer-tools/',
				region: 'ap-southeast-2',
				architectEnumString: 'archEnums.LOCATIONS.ap_southeast_2',
			},
			developermypurecloudjp: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.mypurecloud.jp/developer-tools/',
				region: 'ap-northeast-1',
				architectEnumString: 'archEnums.LOCATIONS.ap_northeast_1',
			},
			developermypurecloudde: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.mypurecloud.de/developer-tools/',
				region: 'eu-central-1',
				architectEnumString: 'archEnums.LOCATIONS.prod_eu_central_1',
			},
			developerusw2purecloud: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.usw2.pure.cloud/developer-tools/',
				region: 'us-west-2',
				architectEnumString: 'archEnums.LOCATIONS.prod_us_west_2',
			},
			developerapne2purecloud: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.apne2.pure.cloud/developer-tools/',
				region: 'us-west-2',
				architectEnumString: 'archEnums.LOCATIONS.prod_ap_northeast2',
			},
			developercac1purecloud: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.cac1.pure.cloud/developer-tools/',
				region: 'us-west-2',
				architectEnumString: 'archEnums.LOCATIONS.prod_ca_central_1',
			},
			developereuw2purecloud: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://developer.euw2.pure.cloud/developer-tools/',
				region: 'us-west-2',
				architectEnumString: 'archEnums.LOCATIONS.prod_eu_west_2',
			},
			appsmypurecloudcom: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.mypurecloud.com/developer-tools/',
				region: 'prod',
				architectEnumString: 'archEnums.LOCATIONS.prod_us_east_1',
			},
			appsmypurecloudie: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.mypurecloud.ie/developer-tools/',
				region: 'eu-west-1',
				architectEnumString: 'archEnums.LOCATIONS.prod_eu_west_1',
			},
			appsmypurecloudcomau: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.mypurecloud.com.au/developer-tools/',
				region: 'ap-southeast-2',
				architectEnumString: 'archEnums.LOCATIONS.ap_southeast_2',
			},
			appsmypurecloudjp: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.mypurecloud.jp/developer-tools/',
				region: 'ap-northeast-1',
				architectEnumString: 'archEnums.LOCATIONS.ap_northeast_1',
			},
			appsmypurecloudde: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.mypurecloud.de/developer-tools/',
				region: 'eu-central-1',
				architectEnumString: 'archEnums.LOCATIONS.prod_eu_central_1',
			},
			appsusw2purecloud: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.usw2.pure.cloud/developer-tools/',
				region: 'us-west-2',
				architectEnumString: 'archEnums.LOCATIONS.prod_us_west_2',
			},
			appsapne2purecloud: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.apne2.pure.cloud/developer-tools/',
				region: 'us-west-2',
				architectEnumString: 'archEnums.LOCATIONS.prod_ap_northeast2',
			},
			appscac1purecloud: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.cac1.pure.cloud/developer-tools/',
				region: 'us-west-2',
				architectEnumString: 'archEnums.LOCATIONS.prod_ca_central_1',
			},
			appseuw2purecloud: {
				clientId: '96a7d55b-1ed5-4719-9094-08a2a69ca07c',
				redirect: 'https://apps.euw2.pure.cloud/developer-tools/',
				region: 'us-west-2',
				architectEnumString: 'archEnums.LOCATIONS.prod_eu_west_2',
			},
		},
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
		ENV.locationType = 'hash';
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.baseURL = '/';
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'production') {
		var buildNumber = process.env.BUILD_NUMBER || 'BUILDNUM';
		var gitBranch = process.env.GIT_BRANCH || 'BRANCH';
		var gitCommit = process.env.GIT_COMMIT || 'SHA';
		var packageVersion = '' + pkg.version;
		var semver = packageVersion + '+' + [buildNumber, gitBranch, gitCommit].join('-');

		if (process.env.CDN_URL && !process.env.OLD_JENKINS) {
			ENV.APP.urlprefix = process.env.CDN_URL;
		}

		ENV.APP.semver = semver;
		ENV.APP.version = packageVersion;

		ENV.baseURL = '/developer-tools/';
		ENV.locationType = 'hash';

		ENV.analyticsTrackingId = process.env.ANALYTICS_ID;

		ENV.newRelic = {
			agent: 'js-agent.newrelic.com/nr-spa-1016.min.js',
			applicationId: process.env.NEW_RELIC_APP_ID,
			licenseKey: process.env.NEW_RELIC_LICENSE_KEY,
			spaMonitoring: true,
		};
	}

	return ENV;
};
