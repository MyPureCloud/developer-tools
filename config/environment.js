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
            dca: {
                clientId: ''
            },
            'pca-us': {
                clientId: ''
            }
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
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
    }

    return ENV;
};
