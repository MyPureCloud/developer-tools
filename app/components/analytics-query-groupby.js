import Ember from 'ember';

export default Ember.Component.extend({
	analyticsValueService: Ember.inject.service(),
	query: "default",
	groupBy: null,
	init: function() {
		this._super(...arguments);

		this.set('groupBy', this.get('analyticsValueService').getGroupBy(this.get('query')));
	}
});
