import Ember from 'ember';
import platformClient from 'platformClient';

let computed = Ember.computed;

export default Ember.Controller.extend({
	purecloud: Ember.inject.service('purecloud'),
	token: '',
	region: '',
	me: '',
	photo: '',

	init() {
		this._super(...arguments);

		this.set('me', this.get('purecloud').get('me'));

		this.set('token', this.get('purecloud').get('accessToken'));

		let futureTime = new Date();
		futureTime.setHours(futureTime.getHours() + 1);
		this.set('time', futureTime.toTimeString().split(' ')[0]);

		let storage = this.get('storageService');
		let savedData = storage.localStorageGet('callbackParams');

		if (savedData) {
			this.set('name', savedData.name);
			this.set('queue', savedData.queue);
			this.set('phone', savedData.phone);
			this.set('customAttributes', savedData.customAttributes);
		}
	},
});
