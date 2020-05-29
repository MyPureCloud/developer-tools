import Ember from 'ember';
import toolsModules from '../utils/dev-tools-modules';

export default Ember.Component.extend({
	purecloud: Ember.inject.service(),
	modules: toolsModules,
	init() {
		this._super(...arguments);
	}
});
