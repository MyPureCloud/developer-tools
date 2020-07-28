/* exported queues */
import Ember from 'ember';

export default Ember.Service.extend({
	purecloud: Ember.inject.service(),

	queues: [],

	updateQueuesFromPureCloud() {
		let self = this;
		this.set('isLoadingQueues', true);
		return new Ember.RSVP.Promise(function(resolve, reject) {
			let routingApi = self.get('purecloud').routingApi();

			function processPageOfQueues(results) {
				self.queues.addObjects(results.entities);

				if (results.nextUri && !self.isDestroyed) {
					//get the next page of users directly
					self
						.get('purecloud')
						.getMore(results.nextUri)
						.then(processPageOfQueues)
						.catch(function(err) {
							self.set('isLoadingQueues', false);
							reject(err);
						});
				} else {
					if(!self.isDestroyed) {
						self.set('isLoadingQueues', false);
					}
					resolve();
				}
			}
			routingApi
				.getRoutingQueues({ sortBy: 'name', pageSize: 100 })
				.then(processPageOfQueues)
				.catch(function(err) {
					if(!self.isDestroyed) {
						self.set('isLoadingQueues', false);
					}
					reject(err);
				});
		});
	},

	init() {
		this._super(...arguments);
		this.updateQueuesFromPureCloud();
	}
});
