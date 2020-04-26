/*global $*/

import Ember from 'ember';
var { observer, computed } = Ember;
import { purecloudEnvironmentTld } from '../utils/purecloud-environment';

export default Ember.Controller.extend({
	purecloud: Ember.inject.service('purecloud'),
	pageSize: 25,
	pageNumber: 1,
	getUsers: true,
	getGroups: true,
	getLocations: true,
	getChats: false,
	sortOptions: ['ASC', 'DESC', 'SCORE'],
	sort: 'SCORE',
	searchType: 'general_search',
	searchTypes: [
		{
			name: 'General search',
			id: 'general_search',
			url: '/api/v2/search'
		},
		{
			name: 'Suggest',
			id: 'suggest',
			url: '/api/v2/search/suggest'
		}
	],
	queryTypes: [
		'EXACT',
		'CONTAINS',
		'STARTS_WITH',
		//         'REQUIRED_FIELDS',
		'RANGE',
		'DATE_RANGE',
		'LESS_THAN',
		'LESS_THAN_EQUAL_TO',
		'GREATER_THAN',
		'GREATER_THAN_EQUAL_TO',
		'TERM'
		//             'TERMS'.
	],
	aggregateTypes: ['COUNT', 'SUM', 'AVERAGE', 'TERM', 'CONTAINS', 'STARTS_WITH', 'ENDS_WITH'],
	aggregateSort: ['VALUE_DESC', 'VALUE_ASC', 'COUNT_DESC', 'COUNT_ASC'],
	aggregates: [],
	queryFilters: [],
	queryFilterOperators: ['AND', 'OR', 'NOT'],
	profileQueryParameter: false,
	returnFields: ['guid'],
	url: computed('searchType', 'profileQueryParameter', function() {
		let type = this.get('searchType');
		for (let x = 0; x < this.searchTypes.length; x++) {
			if (this.searchTypes[x].id === type) {
				return this.searchTypes[x].url;
			}
		}
	}),
	_calculateQueryJson() {
		let query = {
			pageSize: this.get('pageSize'),
			pageNumber: this.get('pageNumber'),
			types: []
		};

		if (this.get('searchType') === 'general_search') {
			query.sortOrder = this.get('sort');
		}

		if (this.get('searchType') === 'general_search' && this.profileQueryParameter) {
			query.returnFields = this.get('returnFields');
		}

		if (this.queryFilters.length > 0) {
			query.query = this.queryFilters;
		}

		if (this.get('getUsers') === true) {
			query.types.push('users');
		}

		if (this.get('getGroups') === true) {
			query.types.push('groups');
		}

		if (this.get('getLocations') === true) {
			query.types.push('locations');
		}

		if (this.get('getChats') === true) {
			query.types.push('messages');
		}

		if (this.aggregates.length > 0) {
			query.aggregations = this.aggregates;
		}

		this.set('queryJson', JSON.stringify(query, null, '  '));
	},
	queryObserver: observer(
		'queryFilters',
		'queryFilters.@each',
		'queryFilters.@each.fields',
		'queryFilters.@each.type',
		'queryFilters.@each.operator',
		'queryFilters.@each.value',
		'queryFilters.@each.startValue',
		'queryFilters.@each.endValue',
		'sort',
		'pageSize',
		'pageNumber',
		'getUsers',
		'getGroups',
		'getLocations',
		'getChats',
		'aggregates',
		'aggregates.@each',
		'aggregates.@each.field',
		'aggregates.@each.type',
		'aggregates.@each.name',
		'aggregates.@each.value',
		'returnFields.@each',
		'profileQueryParameter',
		function() {
			this._calculateQueryJson();
			this._setAvailableFilterFields();
			this._setSearchTypeUrls();
		}
	),
	searchTypeObserver: observer('searchType', function() {
		this.queryFilters.clear();
		this._setInitialFilter();
		this.aggregates.clear();
	}),
	chatTypeObserver: observer('getChats', function() {
		if (this.get('getChats') === true) {
			this.set('getLocations', false);
			this.set('getUsers', false);
			this.set('getGroups', false);
		}
		this._setInitialFilter();
	}),
	nonChatTypeObserver: observer('getLocations', 'getUsers', 'getGroups', function() {
		let thisContext = this;
		Ember.run.later(function() {
			if (thisContext.get('getLocations') === true || thisContext.get('getUsers') === true || thisContext.get('getGroups') === true) {
				thisContext.set('getChats', false);
			}
		}, 1);
	}),
	_setAvailableFilterFields() {
		let properties = [];

		function getPropertiesFromModel(modelProperties) {
			for (let x = 0; x < modelProperties.length; x++) {
				let property = modelProperties[x];
				if (properties.indexOf(property) === -1) {
					properties.push(property);
				}
			}
		}

		let modelProperties = {
			User: ['id', 'name', 'department', 'email', 'title', 'username', 'presence', 'routingStatus', 'station', 'profileSkills'],
			Group: ['id', 'name', 'description', 'dateModified', 'state', 'type', 'addresses', 'visibility'],
			Location: ['id', 'name', 'address', 'addressVerified', 'emergencyNumber', 'state'],
			Chat: ['body', 'created']
		};

		if (this.get('getUsers') === true) {
			getPropertiesFromModel(modelProperties['User']);
		}

		if (this.get('getGroups') === true) {
			getPropertiesFromModel(modelProperties['Group']);
		}

		if (this.get('getLocations') === true) {
			getPropertiesFromModel(modelProperties['Location']);
		}

		if (this.get('getChats') === true) {
			getPropertiesFromModel(modelProperties['Chat']);
		}

		properties.sort();

		this.set('availableFilterFields', properties);
	},
	_setSearchTypeUrls() {
		for (let x = 0; x < this.searchTypes.length; x++) {
			if (this.searchTypes[x].id === 'general_search') {
				this.searchTypes[x].url = this.profileQueryParameter ? '/api/v2/search' : '/api/v2/search?profile=false';
			} else if (this.searchTypes[x].id === 'suggest') {
				this.searchTypes[x].url = this.profileQueryParameter ? '/api/v2/search/suggest' : '/api/v2/search/suggest?profile=false';
			}
		}
	},
	_setInitialFilter() {
		if (this.get('searchType') === 'general_search') {
			let queryFilter = {
				type: 'TERM',
				fields: [],
				value: 'mySearchKeyword',
				operator: 'AND'
			};
			if (this.get('getChats') !== true) {
				queryFilter.fields.push('name');
			} else if (this.get('getChats') === true) {
				queryFilter.fields.push('body');
			}
			this.queryFilters.clear();
			this.queryFilters.pushObject(queryFilter);
		} else {
			this.queryFilters.pushObject({
				value: 'mySuggestKeyword'
			});
		}
	},
	queryJson: '',
	queryResult: null,
	init() {
		this._setInitialFilter();
		this._calculateQueryJson();
		this.get('getUsers');
		this.get('getChats');
		this._setAvailableFilterFields();
		this._setSearchTypeUrls();
	},
	isStandalone: computed('purecloud.isStandalone', function() {
		return this.get('purecloud.isStandalone');
	}),
	actions: {
		selectSearchType(type) {
			let currentType = this.get('searchType');

			if (currentType !== type) {
				this.set('searchType', type);
			}
		},
		runQuery() {
			let query = this.get('queryJson');

			let url = this.get('url');
			let environment = purecloudEnvironmentTld();
			let purecloud = this.get('purecloud');

			let requestUrl = `https://api.${environment}${url}`;

			let self = this;

			$.ajax({
				type: 'POST',
				url: requestUrl,
				data: query,
				timeout: 5000,
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				headers: {
					Authorization: 'bearer ' + purecloud.get('accessToken')
				}
			})
				.done(function(data) {
					self.set('queryResult', JSON.stringify(data, null, '  '));
				})
				.catch(function(err) {
					self.set('queryResult', JSON.stringify(err, null, '  '));
				});
		},
		updateQuery(queryJson) {
			console.log('update query', queryJson);
			this.set('queryJson', queryJson);
		},
		newQueryFilter() {
			if (this.get('searchType') === 'general_search') {
				this.queryFilters.pushObject({
					type: 'TERM',
					fields: [],
					operator: 'AND'
				});
			} else {
				this.queryFilters.pushObject({
					value: 'mySuggestKeyword'
				});
			}
		},
		deleteQueryFilter(index) {
			this.queryFilters.removeAt(index);
		},
		newAggregate() {
			this.aggregates.pushObject({
				type: 'TERM',
				field: this.get('availableFilterFields')[4],
				name: 'myAggregationBucketName'
			});
		},
		deleteAggregate(index) {
			this.aggregates.removeAt(index);
		}
	}
});
