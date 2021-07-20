import Ember from 'ember';
import config from '../config/environment';
import { purecloudEnvironment } from '../utils/purecloud-environment';

export default Ember.Service.extend({
	purecloud: Ember.inject.service('purecloud'),
	savedAccounts: [],
	localInitialized: [],
	selectedAccount: null,

	acc: Ember.computed('initialized', function () {
		return this.get('initialized');
	}),

	getSelected: Ember.observer('selected', function () {
		let selectedAccount = this.get('selectedAccount');
		this.get('purecloud').setSelected(selectedAccount);
	}),

	init() {
		let storage = window.localStorage;
		let initializedAccounts = JSON.parse(storage.getItem('initialized'));
		this.localInitialized = initializedAccounts.accounts;
		//this.set('initialized', initializedAccounts.accounts);
		let selectedAccount = JSON.parse(storage.getItem('selectedAccount'));
		this.setSelected(selectedAccount);
		let savedAccountsData = JSON.parse(storage.getItem('accounts'));
		this.savedAccounts = savedAccountsData.accounts;
		this.set('accounts', savedAccountsData.accounts);
	},

	setSelected(account) {
		let temp = [];

		for (let i = 0; i < this.localInitialized.length; i++) {
			this.localInitialized[i].status = false;
			if (this.localInitialized[i].userId === account.userId) {
				this.localInitialized[i].status = true;
			}
		}
		temp = [...this.localInitialized];
		this.set('initialized', temp);

		//store in modified initialized accounts in local storage
		let storedInitialized = JSON.parse(window.localStorage.getItem('initialized'));
		storedInitialized.accounts = temp;
		window.localStorage.setItem('initialized', JSON.stringify(storedInitialized));
		this.set('selectedAccount', account);
	},

	deleteAccount(accountId) {
		let tempAccounts = [];
		let tempInitialized = [];
		for (let i = 0; i < this.savedAccounts.length; i++) {
			if (this.savedAccounts[i].userId === accountId) {
				this.savedAccounts.splice(i, 1);
				tempAccounts = [...this.savedAccount];
			}
		}
		for (let i = 0; i < this.localInitialized.length; i++) {
			if (this.localInitialized[i].userId === accountId) {
				this.localInitialized.splice(i, 1);
				tempInitialized = [...this.localInitialized];
			}
		}
		//Store modified initialized accounts
		let storedInitialized = JSON.parse(window.localStorage.getItem('initialized'));
		storedInitialized.accounts = tempInitialized;
		this.set('initialized', tempInitialized);
		window.localStorage.setItem('initialized', JSON.stringify(storedInitialized));

		//Store modified accounts' data
		let storedAccountsData = JSON.parse(window.localStorage.getItem('accounts'));
		storedAccountsData.accounts = tempAccounts;
		window.localStorage.setItem('accounts', JSON.stringify(storedAccountsData));
	},

	addAccount(environment) {
		const oauthConfig = config.oauthProps[purecloudEnvironment()];
		window.location.assign(
			`https://login.${environment}/oauth/authorize?client_id=${
				oauthConfig.clientId
			}&response_type=token&prompt=login&redirect_uri=${encodeURI(oauthConfig.redirect)}&state=${encodeURIComponent(environment)}`
		);
	},
});
