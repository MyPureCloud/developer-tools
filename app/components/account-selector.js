import Ember from 'ember';

export default Ember.Component.extend({
	purecloud: Ember.inject.service('purecloud'),
	accountManager: Ember.inject.service('accountManager'),
	showRegions: false,
	showDevEnv: null,

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
			this.get('accountManager').addAccount(env);
		},

		toggleRegionSelection: function () {
			this.set('showRegions', !this.showRegions);
		},
	},
});
