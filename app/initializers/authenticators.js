import config from '../config/environment';
import { purecloudEnvironment } from '../utils/purecloud-environment';
import { purecloudEnvironmentTld } from '../utils/purecloud-environment';
import Account from '../utils/account';
import platformClient from 'platformClient';
import Ember from 'ember';

export default {
	name: 'authenticators',
	featureTogglesToQuery: ['archDevToolsScripting'],
	environment: 'environment',

	removeAccount(account) {
		let accountList;
		let storage = window.localStorage;
		let StoredAccounts = storage.getItem('accounts');
		if (StoredAccounts === 'null' || !StoredAccounts) {
		} else {
			accountList = JSON.parse(StoredAccounts);
			for (let i = 0; i < accountList.accounts.length; i++) {
				if (accountList.accounts[i].token === account.token) {
					accountList.accounts.splice(i, 1);
				}
			}
			storage.setItem('accounts', JSON.stringify(accountList));
		}
	},

	removeinitializedDuplicates() {
		let accountList;
		let storage = window.localStorage;
		let StoredAccounts = storage.getItem('initialized');
		if (StoredAccounts === 'null' || !StoredAccounts) {
		} else {
			accountList = JSON.parse(StoredAccounts);
			let keepAccount = [];
			let temp = [];
			for (let i = accountList.accounts.length - 1; i >= 0; i--) {
				const userId = accountList.accounts[i].userId;
				if (temp.includes(userId)) {
					continue;
				}
				if (userId && userId !== '') {
					temp.push(userId);
				}
				keepAccount.push(accountList.accounts[i]);
			}
			accountList.accounts = keepAccount.reverse();
			storage.setItem('initialized', JSON.stringify(accountList));
		}
	},

	removeDuplicates() {
		let accountList;
		let storage = window.localStorage;
		let StoredAccounts = storage.getItem('accounts');
		if (StoredAccounts === 'null' || !StoredAccounts) {
		} else {
			accountList = JSON.parse(StoredAccounts);
			let keepAccount = [];
			let temp = [];
			for (let i = accountList.accounts.length - 1; i >= 0; i--) {
				const userId = accountList.accounts[i].userId;
				if (temp.includes(userId) || userId === undefined) {
					continue;
				}
				if (userId) {
					temp.push(userId);
				}
				keepAccount.push(accountList.accounts[i]);
			}
			accountList.accounts = keepAccount.reverse();
			storage.setItem('accounts', JSON.stringify(accountList));
		}
	},

	initAccount(accountData) {
		let that = this;
		let newAccount = new Account(accountData.token, accountData.env);

		try {
			// Initialize account info
			newAccount.inited().then(
				function () {
					let accountsObj = {
						accounts: [],
					};
					let storage = window.localStorage;
					let storedAccounts = storage.getItem('accounts');
					let storedInitialized = storage.getItem('initialized');
					if (storedAccounts === 'null' || !storedAccounts) {
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
						that.removeinitializedDuplicates();
						that.addAccountData(newAccount.getData());
						that.removeDuplicates();
					}
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
		let StoredAccounts = storage.getItem('accounts');
		if (StoredAccounts === 'null' || !StoredAccounts) {
			accountsList.accounts.push(account);
			storage.setItem('accounts', JSON.stringify(accountsList));
		} else {
			accountsList = JSON.parse(StoredAccounts);
			accountsList.accounts.push(account);
			storage.setItem('accounts', JSON.stringify(accountsList));
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
		let thi = this;
		let accountsList;
		let storage = window.localStorage;
		storage.removeItem('initialized');
		console.log(JSON.parse(window.localStorage.getItem('accounts')));
		let StoredAccounts = storage.getItem('accounts');
		accountsList = JSON.parse(StoredAccounts) || [];
		let accounts = accountsList.accounts || [];
		accounts.forEach(start);

		function start(accountData) {
			thi.initAccount(accountData);
		}

		if (window.location.hash) {
			const hash = window.location.hash.substring(1);
			var params = {};
			hash.split('&').map((hk) => {
				let temp = hk.split('=');
				params[temp[0]] = temp[1];
			});
			console.log(params);
			if (params.access_token) {
				this.initAccount({ token: params.access_token, env: params.state || 'aps1.pure.cloud' });
				window.location.hash = '';
				document.getElementById('regionModal').style.display = 'none';
				application.advanceReadiness();
			}
		} else if (!accountsList || accountsList.accounts.length == 0) {
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
			application.advanceReadiness();
		}
	},
};
