/*global $*/
import Ember from 'ember';

export default Ember.Service.extend({
	swagger: {},
	init() {
		let that = this;
		let swaggerUrl = '/swagger-schema/publicapi-v2-latest.json';

		if (window.location.host.indexOf('localhost') > -1) {
			swaggerUrl = '/publicapi-v2-latest.json';
			console.warn("Using local publicapi-v2-latest.json file, this may be outdated!");
		}

		$.getJSON({
			url: swaggerUrl,
			xhrFields: {
				withCredentials: true
			}
		})
			.done(function(swagger) {
				try {
					console.log('swagger loaded');

					if(!that.isDestroyed) {

						that.set('swagger', swagger);
					}
				} catch(err) {
					console.log(err.stack);
				}
			})
			.fail(function(err) {
				console.error(err);
			});
	}
});
