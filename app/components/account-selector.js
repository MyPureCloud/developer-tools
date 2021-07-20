import Ember from 'ember';

export default Ember.Component.extend({
	purecloud: Ember.inject.service('purecloud'),
	accountManager: Ember.inject.service('accountManager'),
	showRegions: false,

	actions: {
		addAccount(env) {
			this.get('accountManager').addAccount(env);
		},

		toggleRegionSelection: function () {
			this.set('showRegions', !this.showRegions);
		},
	},
});
