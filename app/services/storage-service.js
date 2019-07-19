import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
	localStorageSet(key, value) {
		try {
			if (typeof window.localStorage !== 'undefined') {
				window.localStorage['developertools-' + key] = JSON.stringify(value);
			}
		} catch (ex) {
			console.warn(ex);
		}
	},
	localStorageGet(key) {
		try {
			if (typeof window.localStorage !== 'undefined') {
				if (window.localStorage['developertools-' + key]) {
					return JSON.parse(window.localStorage['developertools-' + key]);
				}
			}
		} catch (ex) {
			console.warn(ex);
		}

		return null;
	}
});
