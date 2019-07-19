import Ember from 'ember';

export default Ember.Service.extend({
	purecloud: Ember.inject.service(),

	systemPresence: [],
	organizationPresence: [],

	init() {
		this._super(...arguments);

		let locale = window.navigator.userLanguage || window.navigator.language;

		let self = this;

		let presenceApi = self.get('purecloud').presenceApi();

		function processPageOfOrganizationPresence(results) {
			for (let x = 0; x < results.entities.length; x++) {
				let presence = results.entities[x];

				if (presence.languageLabels[locale]) {
					presence.name = presence.languageLabels[locale];
				} else if (presence.languageLabels['en_US']) {
					presence.name = presence.languageLabels['en_US'];
				} else {
					let firstKey = Object.keys(presence.languageLabels)[0];
					presence.name = presence.languageLabels[firstKey];
				}

				self.organizationPresence.addObject(presence);
			}

			if (results.nextUri) {
				self
					.get('purecloud')
					.getMore(results.nextUri)
					.then(processPageOfOrganizationPresence)
					.catch((err) => console.log(err));
			} else {
				console.log(self.get('organizationPresence'));
			}
		}
		presenceApi.getPresencedefinitions(0, 40, false, locale).then(processPageOfOrganizationPresence);

		presenceApi.getSystempresences().then((presence) => {
			for (let x = 0; x < presence.length; x++) {
				presence[x].id = presence[x].name;
				self.systemPresence.addObject(presence[x]);
			}
		});
	}
});
