import Ember from 'ember';
var observer = Ember.observer;

export default Ember.Component.extend({
	noGranularity: true,
	granularity: 'P1M',
	availableValues: [
		{ value: 'P1M', text: 'One Month' },
		{ value: 'P1D', text: 'One Day' },
		{ value: 'PT1H', text: 'One Hour' },
		{ value: 'PT30M', text: '30 Minutes' },
		{ value: 'PT15M', text: '15 Minutes' }
	],
	init() {
		this._super(...arguments);
		this.set('value', this.get('granularity'));
		this.get('noGranularity');
	},
	valuesChanged: observer('noGranularity', 'granularity', function() {
		let noInterval = this.get('noGranularity');
		let value = '';
		if (noInterval) {
			value = null;
		} else {
			value = this.get('granularity');
		}

		this.set('value', value);

		return value;
	})
});
