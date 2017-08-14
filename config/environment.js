/* jshint node: true */

var pkg = require('../package.json');

module.exports = function(environment) {
    var ENV = {

        modulePrefix: 'developer-tools',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },
        contentSecurityPolicy: {
            'connect-src': "'self' https://*.nr-data.net",
            'img-src': "'self' https://*.nr-data.net",
            'script-src': "'self' http://*.newrelic.com https://*.nr-data.net http://*.nr-data.net",
        },
        APP: {
            version: pkg.version,
            semver: pkg.version + '-edge',
            urlprefix: ''
        },
        'oauthProps': {
            localhost: {
                clientId: 'f2f2762f-6c8f-4f06-9f13-0560c17cef2b',
                redirect: 'http://localhost:4200/',
                region: 'dev',
                architectEnumString: 'archEnums.LOCATIONS.dev'
            },
            inindca: {
                clientId: 'f2f2762f-6c8f-4f06-9f13-0560c17cef2b',
                redirect: 'https://developer.inindca.com/developer-tools/',
                region: 'dev',
                architectEnumString: 'archEnums.LOCATIONS.dev'
            },
            inintca:{
                clientId: '89814d34-de36-4f99-8f55-399aa84cb620',
                redirect: 'https://developer.inintca.com/developer-tools/',
                region: 'test',
                architectEnumString: 'archEnums.LOCATIONS.test'
            },
            ininsca: {
                clientId: 'b16c40bf-1d9d-4f59-9f1c-07e60528c659',
                redirect: 'https://apps.ininsca.com/developer-tools/',
                region: 'stage',
                architectEnumString: 'archEnums.LOCATIONS.stage'
            },
            mypurecloudcom: {
                clientId: 'd7200ae7-b2bb-4ff6-afcf-e29ebd1d6f56',
                redirect: 'https://developer.mypurecloud.com/developer-tools/',
                region: 'prod',
                architectEnumString: 'archEnums.LOCATIONS.prod_us_east_1'
            },
            mypurecloudie: {
                clientId: '51729d1d-e816-4f3d-9fb7-cf5fa0b79041',
                redirect: 'https://developer.mypurecloud.ie/developer-tools/',
                region: 'eu-west-1',
                architectEnumString: 'archEnums.LOCATIONS.prod_ue_west_1'

            },
            mypurecloudcomau: {
                clientId: '303ae267-3163-4fec-9f38-d02f9764a849',
                redirect: 'https://developer.mypurecloud.com.au/developer-tools/',
                region: 'ap-sourtheast-2',
                architectEnumString: 'archEnums.LOCATIONS.ap_sourtheast_2'
            },
            mypurecloudjp: {
                clientId: '818a2480-2f88-4f0a-afc0-777dce4f3f6e',
                redirect: 'https://developer.mypurecloud.jp/developer-tools/',
                region: 'ap-northeast-1',
                architectEnumString: 'archEnums.LOCATIONS.ap_northeast_1'
            }
        }
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
            agent: "js-agent.newrelic.com/nr-spa-1016.min.js",
            applicationId: process.env.NEW_RELIC_APP_ID,
            licenseKey: process.env.NEW_RELIC_LICENSE_KEY,
            spaMonitoring: true
        };
    }

    return ENV;
};
