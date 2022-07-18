import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
	accountManager: Ember.inject.service('accountManager'),

	purecloud: Ember.inject.service('purecloud'),

	active: computed('accountManager.selectedAccount', function () {
		return this.get('account').status;
	}),

	accountInfo: null,

	profileImg: null,

	checked: null,

	me: null,

	environmentShort(region) {
		let regionShort = '';
		switch (region) {
			case 'mypurecloud.com':
				regionShort = 'USE1';
				break;
			case 'usw2.pure.cloud':
				regionShort = 'USW2';
				break;
			case 'cac1.pure.cloud':
				regionShort = 'CAC1';
				break;
			case 'mypurecloud.de':
				regionShort = 'EUC1';
				break;
			case 'mypurecloud.ie':
				regionShort = 'EUW1';
				break;
			case 'euw2.pure.cloud':
				regionShort = 'EUW2';
				break;
			case 'mypurecloud.com.au':
				regionShort = 'APSE2';
				break;
			case 'apne2.pure.cloud':
				regionShort = 'APNE2';
				break;
			case 'mypurecloud.jp':
				regionShort = 'APNE1';
				break;
			case 'aps1.pure.cloud':
				regionShort = 'APS1';
				break;
			case 'inindca.com':
				regionShort = 'DCA';
				break;
			case 'inintca.com':
				regionShort = 'TCA';
				break;
			case 'use2.us-gov-pure.cloud':
				regionShort = 'FedRAMP';
				break;
			case 'sae1.pure.cloud':
				regionShort = 'SAE1';
				break;
			default:
				regionShort = 'UNK';
		}
		return regionShort;
	},

	init() {
		this._super(...arguments);
		this.createAccount(this.get('account'));
	},

	createAccount(account) {
		this.set('me', account.me);
		this.set('profileImg', account.profilePicUri);
		this.env = this.environmentShort(account.environment);
		this.checked = account.confirmChanges;
		this.accountInfo = account;
	},

	actions: {
		checkAccount: function (account) {
			let checkboxBoolean = !this.checked;
			this.get('accountManager').confirmChanges(account, checkboxBoolean);
			this.set('checked', checkboxBoolean);
		},
		switchaccounts: function () {
			window.localStorage.setItem('selectedAccount', JSON.stringify(this.accountInfo));
			this.get('accountManager').setSelected(this.accountInfo);
		},
		deleteAccount: function (id) {
			this.get('accountManager').deleteAccount(id, this.accountInfo.token);
		},
	},
});
