import config from '../config/environment';
import { purecloudEnvironment } from '../utils/purecloud-environment';
import Account from '../utils/account';

export default {
	name: 'authenticators',
	accounts: 'accounts',
	accountManager: Ember.inject.service(),

	removeAccount(account) {
		let accountObj;
		let storage = window.localStorage;
		let storedAccounts = storage.getItem(this.accounts);
		if (storedAccounts === 'null' || !storedAccounts) {
		} else {
			accountObj = JSON.parse(storedAccounts);
			for (let i = 0; i < accountObj.accounts.length; i++) {
				if (accountObj.accounts[i].token === account.token) {
					accountObj.accounts.splice(i, 1);
				}
			}
			storage.setItem(this.accounts, JSON.stringify(accountObj));
		}
	},

	removeInitializedDuplicates() {
		let accountObj;
		let storage = window.localStorage;
		let storedAccounts = storage.getItem('initialized');
		if (storedAccounts !== 'null' || storedAccounts) {
			accountObj = JSON.parse(storedAccounts);
			let keepAccount = [];
			let temp = [];
			for (let i = accountObj.accounts.length - 1; i >= 0; i--) {
				const userId = accountObj.accounts[i].userId;
				if (temp.includes(userId)) {
					continue;
				}
				if (userId && userId !== '') {
					temp.push(userId);
				}
				keepAccount.push(accountObj.accounts[i]);
			}
			accountObj.accounts = keepAccount.reverse();
			storage.setItem('initialized', JSON.stringify(accountObj));
		}
	},

	removeAccountDuplicates() {
		let accountObj;
		let storage = window.localStorage;
		let storedAccounts = storage.getItem(this.accounts);
		if (storedAccounts !== 'null' || storedAccounts) {
			accountObj = JSON.parse(storedAccounts);
			let keepAccount = [];
			let temp = [];
			for (let i = accountObj.accounts.length - 1; i >= 0; i--) {
				const userId = accountObj.accounts[i].userId;
				if (temp.includes(userId) || userId === undefined) {
					continue;
				}
				if (userId) {
					temp.push(userId);
				}
				keepAccount.push(accountObj.accounts[i]);
			}
			accountObj.accounts = keepAccount.reverse();
			storage.setItem(this.accounts, JSON.stringify(accountObj));
		}
	},

	initAccount(accountData, application) {
		let that = this;
		let newAccount = new Account(accountData.token, accountData.env);

		try {
			// Initialize account info
			newAccount.initialize().then(
				function () {
					let accountsObj = {
						accounts: [],
					};
					let storage = window.localStorage;
					let storedAccounts = storage.getItem(that.accounts);
					let accountsList = JSON.parse(storedAccounts) || [];
					let acc = accountsList || [];
					let storedInitialized = storage.getItem('initialized');
					if (!storedAccounts || acc.length === 0) {
						storage.setItem('selectedAccount', JSON.stringify(newAccount));
					}
					if (storedInitialized === 'null' || !storedInitialized) {
						accountsObj.accounts.push(newAccount);
						storage.setItem('initialized', JSON.stringify(accountsObj));
						that.addAccountData(newAccount.getData());
					} else {
						accountsObj = JSON.parse(storedInitialized);
						accountsObj.accounts.push(newAccount);
						storage.setItem('initialized', JSON.stringify(accountsObj));
						that.removeInitializedDuplicates();
						that.addAccountData(newAccount.getData());
						that.removeAccountDuplicates();
					}
					application.advanceReadiness();
				},
				function (error) {
					console.log(error);
					that.removeAccount(newAccount);
				}
			);
		} catch (err) {
			console.log(err);
		}
	},

	addAccountData(account) {
		let accountsList = {
			accounts: [],
		};
		let storage = window.localStorage;
		let storedAccounts = storage.getItem(this.accounts);
		if (storedAccounts === 'null' || !storedAccounts) {
			accountsList.accounts.push(account);
			storage.setItem(this.accounts, JSON.stringify(accountsList));
		} else {
			accountsList = JSON.parse(storedAccounts);
			accountsList.accounts.push(account);
			storage.setItem(this.accounts, JSON.stringify(accountsList));
		}
	},

	addAccount(environment) {
		const oauthConfig = config.oauthProps[purecloudEnvironment()];
		window.location.assign(
			`https://login.${environment}/oauth/authorize?client_id=${oauthConfig.clientId}&response_type=token&redirect_uri=${encodeURI(
				oauthConfig.redirect
			)}&state=${encodeURIComponent(environment)}`
		);
	},

	initialize: function (application) {
		application.deferReadiness();
		let self = this;
		let accountsObj;
		let storage = window.localStorage;
		//storage.removeItem(this.accounts);
		let storedAccounts = storage.getItem(this.accounts);
		accountsObj = JSON.parse(storedAccounts) || [];
		let accountsList = accountsObj.accounts || [];
		accountsList.forEach((accountData) => {
			self.initAccount(accountData, application);
		});

		//New Login
		if (window.location.hash) {
			const hash = window.location.hash.substring(1);
			var params = {};
			hash.split('&').map((hk) => {
				let temp = hk.split('=');
				params[temp[0]] = temp[1];
			});
			if (params.access_token) {
				this.initAccount({ token: params.access_token, env: params.state }, application);
				window.location.hash = '';
			}
			//Remove hash from url when there are no saved accounts
			let savedAccounts = window.localStorage.getItem(this.accounts);
			if (savedAccounts === 'null') {
				window.location.assign(' ');
			}
			document.getElementById('regionModal').style.display = 'none';
		} else if (!accountsObj || accountsList.length === 0) {
			var that = this;
			// Append lower envs
			const lowerEnvRegex = /inin[dt]ca|localhost|(?:dev|test)-genesys/i;
			if (window.location.host.match(lowerEnvRegex)) {
				const regionButton = (name, domain) => {
					const btn = document.createElement('button');
					btn.type = 'button';
					btn.className = 'regionButton';
					btn.value = domain;
					btn.textContent = `${name} (${domain})`;
					return btn;
				};
				document.getElementById('regionModalBody').appendChild(regionButton('DCA', 'inindca.com'));
				document.getElementById('regionModalBody').appendChild(regionButton('TCA', 'inintca.com'));
			}
			document.getElementById('regionModal').style.display = 'block';
			$('.regionButton').on('click', function () {
				let env = $(this).attr('value');
				that.addAccount(env);
			});
		} else {
			document.getElementById('regionModal').style.display = 'none';
		}
	},
};
