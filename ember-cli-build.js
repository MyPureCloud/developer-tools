/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
const nodeBuiltins = require('rollup-plugin-node-builtins');

var cdnUrl = process.env.CDN_URL || '';

module.exports = function(defaults) {
	var app = new EmberApp(defaults, {
		autoprefixer: {
			browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
		},
		minifyJS: {
			options: {
				exclude: ['**/vendor.js']
			}
		},
		replace: {
			files: ['index.html'],
			patterns: [{
				match: 'CDN_URL',
				replacement: cdnUrl
			}]
		},
		fingerprint: {
			prepend: cdnUrl,
			exclude: ['emojify', 'leaflet', 'patches/'],
			extensions: ['js', 'css'],
			customHash: null
		},
		babel: {
			sourceMaps: 'inline'
		}
	});

	// Use `app.import` to add additional libraries to the generated
	// output files.
	//
	// If you need to use different assets in different
	// environments, specify an object as the first parameter. That
	// object's keys should be the environment name and the values
	// should be the asset to use in that environment.
	//
	// If the library that you are including contains AMD or ES6
	// modules that you would like to import into your application
	// please specify an object with the list of modules as keys
	// along with the exports of each module as its value.

	app.import('node_modules/purecloud-platform-client-v2/dist/node/purecloud-platform-client-v2.js', {
		using: [
			{ transformation: 'cjs', as: 'platformClient', plugins: [ nodeBuiltins() ] }
		]
	});

	return app.toTree();
};
