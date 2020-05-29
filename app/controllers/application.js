import Ember from 'ember';
var computed = Ember.computed;

export default Ember.Controller.extend({
	purecloud: Ember.inject.service('purecloud'),
	isStandalone: computed(function() {
		return this.get('purecloud.isStandalone');
	})
});
