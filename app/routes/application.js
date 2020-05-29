import Ember from 'ember';

export default Ember.Route.extend({
	analyticsService: Ember.inject.service(),

	beforeModel() {
		return this.get('analyticsService');
	}
});
