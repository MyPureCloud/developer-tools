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

        APP: {
            version: pkg.version,
            semver: pkg.version + '-edge',
            urlprefix: ''
        },
        'oauthProps': {
            localhost: {
                clientId: 'f2f2762f-6c8f-4f06-9f13-0560c17cef2b',
                redirect: 'http://localhost:4200/'
            },
            inindca: {
                clientId: 'f2f2762f-6c8f-4f06-9f13-0560c17cef2b',
                redirect: 'https://developer.inindca.com/tools/'
            },
            ininsca: {
                clientId: 'b16c40bf-1d9d-4f59-9f1c-07e60528c659',
                redirect: 'https://apps.ininsca.com/developer-tools/'
            },
            mypurecloud: {
                clientId: 'd7200ae7-b2bb-4ff6-afcf-e29ebd1d6f56',
                redirect: 'https://developer.mypurecloud.com/tools/'
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
    }

    return ENV;
};
