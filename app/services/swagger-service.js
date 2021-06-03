/*global $*/
import Ember from 'ember';
import { purecloudEnvironmentTld } from '../helpers/purecloud-environment';

export default Ember.Service.extend({
	swagger: {},
	init() {
		let that = this;
		let purecloudEnvironment = purecloudEnvironmentTld();
        let swaggerUrl = `https://api.${purecloudEnvironment}/api/v2/docs/swagger`;

		$.getJSON({
			url: swaggerUrl,
			xhrFields: {
				withCredentials: false
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
