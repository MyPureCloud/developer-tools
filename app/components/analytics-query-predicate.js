import Ember from 'ember';
var observer = Ember.observer;
var computed = Ember.computed;

export default Ember.Component.extend({
	query: "default",
	selectedOperator: 'matches',
	selectedType: 'dimension',
	classNames: ['predicate-section'],
	analyticsValueService: Ember.inject.service(),
	queueService: Ember.inject.service(),
	userService: Ember.inject.service(),
	presenceService: Ember.inject.service(),

	queues: computed('queueService.queues', function() {
		return this.get('queueService').get('queues');
	}),
	users: computed('userService.users', function() {
		return this.get('userService').get('users');
	}),
	systemPresence: computed('presenceService.systemPresence', function() {
		return this.get('presenceService').get('systemPresence');
	}),
	organizationPresence: computed('presenceService.organizationPresence', function() {
		return this.get('presenceService').get('organizationPresence');
	}),
	routingStatus: [{ name: 'COMMUNICATING' }, { name: 'IDLE' }, { name: 'INTERACTING' }, { name: 'NOT_RESPONDING' }, { name: 'OFF_QUEUE' }],
	types: ['dimension', 'metric'], //TODO: Support property type

	//TODO: support queue ids, user Ids,
	init: function() {
		this.get('queueService'); //make sure it is ready

		this._super(...arguments);

		this.set('dimensions', this.get('analyticsValueService').getDimensions(this.get("query")));
		this.set('propertyTypes', this.get('analyticsValueService').get('propertyTypes'));
		this.set('metrics', this.get('analyticsValueService').getMetrics(this.get("query")));
		this.set('operators', this.get('analyticsValueService').get('operators'));
		this.set('mediaTypes', this.get('analyticsValueService').get('mediaTypes'));
		this.set('numericRangeOperators', this.get('analyticsValueService').get('numericRangeOperators'));

		let predicate = this.get('predicate');
		if (predicate) {
			this.set('selectedType', predicate.type);
			this.set('lhsValue', predicate.dimension || predicate.metric || predicate.property);
			if (predicate.operator)
				this.set('selectedOperator', predicate.operator);
			this.set('value', predicate.value);
		}
	},
	didReceiveAttrs() {
		this._super(...arguments);

		if (typeof this.get('filterValueOverride') !== 'undefined' && this.get('filterValueOverride') !== null) {
			this.set('dimensions', this.get('filterValueOverride'));
			this.set('types', ['dimension']);
		}
	},

	isOnChanged: observer('selectedOperator', 'lhsValue', 'value', function() {
		this.set('predicate', this._computeValue());
		this.get('updatePredicate')(this.get('index'), this._computeValue());
	}),

	selectedTypeChanged: observer('selectedType', function() {
		this.set('predicate', this._computeValue());
		this.get('updatePredicate')(this.get('index'), this._computeValue());

		if (this.get('selectedType') === 'metric') {
			this.set('lhsValue', this.metrics[0]);
			this.set('selectedOperator', this.numericRangeOperators[0]);
		} else {
			this.set('lhsValue', this.dimensions[0]);
			this.set('selectedOperator', this.operators[0]);
		}
	}),
	selectedOperatorChange: observer('selectedOperator', function() {
		if (this.get('selectedOperator') !== 'matches') {
			this.set('value', null);
		}
	}),

	_computeValue: function() {
		let predicate = {
			type: this.get('selectedType')
		};

		if (predicate.type === 'dimension') {
			predicate.dimension = this.get('lhsValue');
		} else if (predicate.type === 'metric') {
			predicate.metric = this.get('lhsValue');
		} else if (predicate.type === 'property') {
			predicate.property = this.get('lhsValue');
		}

		if (predicate.type === 'metric') {
			predicate.range = {};
			predicate.range[this.get('selectedOperator')] = parseInt(this.get('value'));
		} else {
			predicate.operator = this.get('selectedOperator');
			predicate.value = this.get('value');
		}

		return predicate;
	},
	actions: {
		delete: function() {
			this.get('deletePredicate')(this.get('index'));
		}
	}
});
