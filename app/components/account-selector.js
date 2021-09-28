import Ember from 'ember';

export default Ember.Component.extend({
	accountManager: Ember.inject.service('accountManager'),
	showRegions: false,
	showDevEnv: null,
	loginPrompt: false,

	init() {
		this._super(...arguments);
		const lowerEnvRegex = /inin[dt]ca|localhost|(?:dev|test)-genesys/i;
		if (window.location.host.match(lowerEnvRegex)) {
			this.set('showDevEnv', true);
		} else {
			this.set('showDevEnv', false);
		}
	},

	actions: {
		addAccount(env) {
			this.get('accountManager').addAccount(env, this.get('loginPrompt'));
		},
		checkLoginPrompt: function () {
			this.set('loginPrompt', !this.get('loginPrompt'));
		},
		toggleRegionSelection: function () {
			this.set('showRegions', !this.showRegions);
		},
	},
});
