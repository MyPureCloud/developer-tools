import Ember from 'ember';
import config from '../config/environment';
import { purecloudEnvironment } from '../utils/purecloud-environment';
import Account from '../utils/account';

export default Ember.Service.extend({
	purecloud: Ember.inject.service('purecloud'),
	savedAccounts: [],
	localInitialized: [],
	selectedAccount: null,

	getSelected: Ember.observer('selectedAccount', function () {
		let selectedAccount = this.get('selectedAccount');
		this.get('purecloud').setSelected(selectedAccount);
		window.location.reload();
	}),

	init() {
		let storage = window.localStorage;
		let initializedAccounts = JSON.parse(storage.getItem('initialized'));
		this.localInitialized = initializedAccounts.accounts;
		let selectedAccount = JSON.parse(storage.getItem('selectedAccount'));
		this.setSelected(selectedAccount);
		let savedAccountsData = JSON.parse(storage.getItem('accounts'));
		this.savedAccounts = savedAccountsData.accounts;
	},

	confirmChanges(account, checkboxBoolean) {
		let temp = [];
		for (let i = 0; i < this.localInitialized.length; i++) {
			let currentConfirmChanges = this.localInitialized[i].confirmChanges;
			if (this.localInitialized[i].userId === account.userId) {
				this.localInitialized[i].confirmChanges = checkboxBoolean;
			}
			if (
				this.localInitialized[i].userId === this.get('selectedAccount').userId &&
				currentConfirmChanges !== this.localInitialized[i].confirmChanges
			) {
				this.setSelected(this.localInitialized[i]);
			}
		}

		temp = [...this.localInitialized];
		this.set('initialized', temp);

		let storedInitialized = JSON.parse(window.localStorage.getItem('initialized'));
		storedInitialized.accounts = temp;
		window.localStorage.setItem('initialized', JSON.stringify(storedInitialized));

		let tempAccounts = temp.map(function (accounts) {
			return Account.getAccountData(accounts);
		});

		let storedAccountsData = JSON.parse(window.localStorage.getItem('accounts'));
		storedAccountsData.accounts = tempAccounts;
		window.localStorage.setItem('accounts', JSON.stringify(storedAccountsData));
		window.location.reload();
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

		//store modified initialized accounts in local storage
		let storedInitialized = JSON.parse(window.localStorage.getItem('initialized'));
		storedInitialized.accounts = temp;
		window.localStorage.setItem('initialized', JSON.stringify(storedInitialized));

		//Set account as selected account and save in local storage
		this.set('selectedAccount', account);
		window.localStorage.setItem('selectedAccount', JSON.stringify(account));
	},

	deleteAccount(accountId, token) {
		let tempAccounts = [];
		let tempInitialized = [];
		for (let i = 0; i < this.savedAccounts.length; i++) {
			if (this.savedAccounts[i].userId === accountId && this.localInitialized[i].userId === accountId) {
				this.savedAccounts.splice(i, 1);
				this.localInitialized.splice(i, 1);
				tempAccounts = [...this.savedAccounts];
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

		//Purposefully ignored error handling
		$.ajax({
			type: 'DELETE',
			url: 'https://api.mypurecloud.com/api/v2/tokens/me',
			contentType: 'application/json',
			dataType: 'json',
			headers: {
				Authorization: 'bearer ' + token,
			},
		});

		if (tempInitialized.length === 0) {
			window.localStorage.removeItem('selectedAccount');
			window.localStorage.removeItem('accounts');
			window.location.assign(' ');
		} else {
			this.setSelected(tempInitialized[0]); // Assign another account as selected account
		}
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
