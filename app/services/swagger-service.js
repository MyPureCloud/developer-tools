/*global $*/
import Ember from 'ember';
import { purecloudEnvironmentTld } from '../helpers/purecloud-environment';

export default Ember.Service.extend({
	swagger: {},
	init() {
		let that = this;
		let purecloudEnvironment = purecloudEnvironmentTld();
        let swaggerUrl = `https://api.${purecloudEnvironment}/api/v2/docs/swagger`;

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
