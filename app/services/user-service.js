
import Ember from 'ember';

export default Ember.Service.extend({
	purecloud: Ember.inject.service(),
	users: [],

	init() {
		this._super(...arguments);

		let self = this;

		let usersApi = self.get('purecloud').usersApi();

		function processPageOfUsers(results){

			self.users.addObjects(results.entities);

			if(results.nextUri){
				//get the next page of users directly
				self.get('purecloud').getMore(results.nextUri).then(processPageOfUsers).catch((err) => console.log(err));
			}
		}
		usersApi.getUsers(40,0,null, 'name').then(processPageOfUsers);
	}
});
