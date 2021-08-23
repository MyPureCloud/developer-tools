import config from '../config/environment';
import { purecloudEnvironment } from '../utils/purecloud-environment';
import Account from '../utils/account';

export default {
	name: 'authenticators',
	accounts: 'accounts',

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

	removeAccount(account) {
		let accountObj;
		let storage = window.localStorage;
		let storedAccounts = storage.getItem(this.accounts);
		if (storedAccounts !== 'null' || storedAccounts) {
			accountObj = JSON.parse(storedAccounts);
			for (let i = 0; i < accountObj.accounts.length; i++) {
				if (accountObj.accounts[i].token === account) {
					accountObj.accounts.splice(i, 1);
				}
			}
			storage.setItem(this.accounts, JSON.stringify(accountObj));
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

	initAccount(accountData) {
		let that = this;
		let newAccount = new Account(accountData.token, accountData.env, accountData.confirmChanges);

		// Initialize account info
		return new Promise(function (myResolve, myReject) {
			newAccount.initialize().then(
				function () {
					let accountsObj = {
						accounts: [],
					};
					let storage = window.localStorage;
					let accountsList = JSON.parse(storage.getItem(that.accounts)) || [];
					let accounts = accountsList.accounts || [];
					let savedCheckboxSettings = JSON.parse(storage.getItem('confirmChanges')) || [];
					let checkboxSettings = savedCheckboxSettings.accounts || []; 

					let accountIds = accounts.map(function (account) {
						return account.userId;
					});

					const checkboxSettingsUserIds = checkboxSettings.map(function(account){
						return account.userId;
					})
					
					if (!accountsList || accounts.length === 0) {
						storage.setItem('selectedAccount', JSON.stringify(newAccount));
					} else {
						const selectedAccount = JSON.parse(window.localStorage.getItem('selectedAccount'));
						if (selectedAccount !== 'null') {
							if (selectedAccount.userId === newAccount.userId) {
								storage.setItem('selectedAccount', JSON.stringify(newAccount)); //Keep saved selected account info up to date
							}
							if (!accountIds.includes(selectedAccount.userId)) {
								storage.setItem('selectedAccount', JSON.stringify(newAccount)); //replaces saved expired account
							}
						}
					}

					//Load saved checkbox setting
					if (checkboxSettingsUserIds.includes(newAccount.userId)) {
						for (let i = 0; i < checkboxSettings.length; i++) {
							if (checkboxSettings[i].userId === newAccount.userId) {
								newAccount.confirmChanges = checkboxSettings[i].confirmChange;
							}
						}
					}

					const storedInitialized = storage.getItem('initialized');

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
					myResolve();
				},
				function (error) {
					that.removeAccount(newAccount.token);
					window.location.reload();
				}
			);
		});
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
			`https://login.${environment}/oauth/authorize?client_id=${
				oauthConfig.clientId
			}&response_type=token&prompt=login&redirect_uri=${encodeURI(oauthConfig.redirect)}&state=${encodeURIComponent(environment)}`
		);
	},

	initialize: function (application) {
		application.deferReadiness();
		let self = this;
		let accountsObj;
		let storage = window.localStorage;
		storage.removeItem('initialized');
		let storedAccounts = storage.getItem(this.accounts);
		accountsObj = JSON.parse(storedAccounts) || [];
		let accountsList = accountsObj.accounts || [];
		
		let accountPromises = accountsList.map(function (acc) {
			return self.initAccount(acc);
		});

		//New Login
		if (window.location.hash) {
			const hash = window.location.hash.substring(1);
			var params = {};
			hash.split('&').map((hashKey) => {
				let temp = hashKey.split('=');
				params[temp[0]] = temp[1];
			});
			if (params.access_token) {
				accountPromises.push(this.initAccount({ token: params.access_token, env: params.state, confirmChanges: false }));
				window.location.hash = '';
			} else if (accountsList.length === 0) {
				window.location.assign(' '); //Sends user to login page when no account is logged in
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
		}

		Promise.all(accountPromises).then((initialized) => {
			//If there are no initialized accounts then application should not start
			if (initialized.length > 0) {
				application.advanceReadiness();
			}
		});
	},
};
