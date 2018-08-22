/* global ININ */
import Ember from 'ember';
import Chance from 'npm:chance';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';
import config from '../config/environment';

var computed = Ember.computed;

export default Ember.Controller.extend({
	purecloud: Ember.inject.service(),
	storageService: Ember.inject.service(),
	queueService: Ember.inject.service(),
	webChatService: Ember.inject.service(),
	org: null,
	firstName: '',
	lastName: '',
	address: '',
	city:'',
	state: '',
	zip: '',
	phone: '',
	queue: '',
	locale: 'en',
	field1name: '',
	field1value: '',
	field2name: '',
	field2value: '',
	field3name: '',
	field3value: '',
	error: '',
	errorVisibility: computed('error', function() { 
		const error = this.get('error');
		return !error || error == '' ? 'hidden' :  '';
	}),
	welcomeMessage: 'Thanks for chatting using the dev tools chat page.',
	chatEnvironment: computed('purecloud.environment', function() { 
		return this.get('purecloud').get('environment');
	}),
	chatRegion: computed('purecloud.environment', function() {
		let environment = this.get('purecloud').get('environment');
		if (!environment || environment === '') return;

		if (environment.endsWith('.jp'))
			return 'ap-northeast-1';
		else if (environment.endsWith('.com.au'))
			this.set('chatRegion', 'ap-southeast-2');
		else if (environment.endsWith('.ie'))
			return 'eu-west-1';
		else if (environment.endsWith('.de'))
			return 'eu-central-1';
		else if (environment.endsWith('mypurecloud.com'))
			return 'us-east-1';
		else if (environment.includes('tca')) {
			this.set('chatEnv', 'test');
			this.set('chatEnvTag', '\n  env="test"');
			return 'us-east-1';
		} else if (environment.includes('dca')) {
			this.set('chatEnv', 'dev');
			this.set('chatEnvTag', '\n  env="dev"');
			return 'us-east-1';
		} else {
			console.warn(`Failed to identify environment: ${environment}`);
			return 'us-east-1';
		}
	}),
	chatEnv: '',
	chatEnvTag: '',
	init(){
		this._super(...arguments);

		let orgApi = this.get('purecloud').orgApi();

		orgApi.getOrganizationsMe().then(result => {
			this.set('org',result);

			let storage = this.get('storageService');
			let savedData = storage.localStorageGet('webChatParams');

			if(savedData){
				this.set('firstName', savedData.firstName);
				this.set('lastName', savedData.lastName);
				this.set('address', savedData.address);
				this.set('city', savedData.city);
				this.set('state', savedData.state);
				this.set('zip', savedData.zip);
				this.set('phone', savedData.phone);
				this.set('queue', savedData.queue);
				this.set('locale', savedData.locale);
				this.set('welcomeMessage', savedData.welcomeMessage);
				this.set('deployment', savedData.deployment);
				this.set('field1name', savedData.field1name);
				this.set('field1value', savedData.field1value);
				this.set('field2name', savedData.field2name);
				this.set('field2value', savedData.field2value);
				this.set('field3name', savedData.field3name);
				this.set('field3value', savedData.field3value);
			}
		});
	},
	deployments: computed('webChatService.deployments', function() {
		return this.get('webChatService').get('deployments');
	}),
	needsDeployment: computed('webChatService.deploymentCount', function() {
		return this.get('webChatService').get('deploymentCount') == 0;
	}),
	queues: computed('queueService.queues', function() {
		return this.get('queueService').get('queues');
	}),
	chatConfig: computed('queue', 'firstName', 'lastName', 'address', 'city', 'zip', 'state', 'phone', 'locale', 'welcomeMessage', 'field1name', 'field1value', 'field2name', 'field2value', 'field3name', 'field3value', function() {
		try{
			let environment = purecloudEnvironmentTld();
			let companyLogo = $('#companyLogo').attr('src');
			let companyLogoSmall = $('#companyLogoSmall').attr('src');
			let agentAvatar = $('#agentAvatar').attr('src');

			let resourcePrefix = window.location.origin;
			if(config.APP.urlprefix){
				resourcePrefix = config.APP.urlprefix;
			}

			if(typeof companyLogo !== 'undefined' && companyLogo[0] !== 'h'){
				companyLogo = resourcePrefix + companyLogo;
				companyLogoSmall = resourcePrefix + companyLogoSmall;
				agentAvatar = resourcePrefix + agentAvatar;
			}

			let org = this.get('org');
			if(org === null){
				return '{}';
			}

			let chatConfig = {
				// Web chat application URL
				'webchatAppUrl': 'https://apps.'+ environment +'/webchat',

				// Web chat service URL
				'webchatServiceUrl': 'https://realtime.'+ environment +':443',

				'orgId': this.get('org').thirdPartyOrgId,

				// Organization name
				'orgName': this.get('org').thirdPartyOrgName,


				'queueName': this.get('queue'),

				// Log level
				'logLevel': 'DEBUG',

				// Locale code
				'locale': this.get('locale'),

				// Data that will be included with interaction
				'data': {
					'firstName': this.get('firstName'),
					'lastName': this.get('lastName'),
					'addressStreet': this.get('address'),
					'addressCity': this.get('city'),
					'addressPostalCode': this.get('zip'),
					'addressState': this.get('state'),
					'phoneNumber': this.get('phone'),
					'customField1Label': this.get('field1name'),
					'customField1': this.get('field1value'),
					'customField2Label': this.get('field2name'),
					'customField2': this.get('field2value'),
					'customField3Label': this.get('field3name'),
					'customField3': this.get('field3value'),
				},

				// Logo used at the top of the chat window
				'companyLogo': {
					'width': 600,
					'height': 149,
					'url': companyLogo
				},

				// Logo used within the chat window
				'companyLogoSmall': {
					'width': 25,
					'height': 25,
					'url': companyLogoSmall
				},

				// Image used for agent
				'agentAvatar': {
					'width': 462,
					'height': 462,
					'url': agentAvatar
				},

				// Text displayed with chat window is displayed
				'welcomeMessage': this.get('welcomeMessage'),

				// CSS class applied to the chat window
				'cssClass': 'webchat-frame',

				// Custom style applied to the chat window
				'css': {
					'width': '100%',
					'height': '100%'
				}
			};

			return JSON.stringify(chatConfig, null, '  ');
		}catch(ex){
			console.error(ex);
		}
		return '{}';
	}),
	setError(err) {
		if (!err) {
			this.set('error', '');
			return;
		}

		console.error(err);
		if (err.body && err.body.message)
			this.set('error', err.body.message);
		else if (err.message)
			this.set('error', err.message);
		else
			this.set('error', 'An error has occurred');
	},
	openChatWindow() {
		try {
			let chatConfig = JSON.parse(this.get('chatConfig'));

			ININ.webchat.create(chatConfig, (err, webchat) => {
				if (err) {
					this.setError(err);
					return;
				}

				webchat.renderPopup({
					width: 400,
					height: 400,
					title: 'PureCloud Developer Tools Web Chat'
				});
			});

			let savedData = {
				firstName: this.get('firstName'),
				lastName: this.get('lastName'),
				address: this.get('address'),
				city: this.get('city'),
				state: this.get('state'),
				zip: this.get('zip'),
				phone: this.get('phone'),
				queue: this.get('queue'),
				locale: this.get('locale'),
				welcomeMessage: this.get('welcomeMessage'),
				deployment: this.get('deployment'),
				field1name: this.get('field1name'),
				field1value: this.get('field1value'),
				field2name: this.get('field2name'),
				field2value: this.get('field2value'),
				field3name: this.get('field3name'),
				field3value: this.get('field3value'),
			};

			let storage = this.get('storageService');
			storage.localStorageSet('webChatParams', savedData);
		} catch(err) {
			this.setError(err);
		}
	},
	actions:{
		startChat() {
			try {
				this.setError();

				// Validation
				let chatConfig = JSON.parse(this.get('chatConfig'));
				if (!chatConfig.queueName || chatConfig.queueName == '')
					throw new Error('You must select a queue before starting the chat');
				if (!this.deployment || this.deployment == '')
					throw new Error('You must select a deployment before starting the chat');


				const chatScript = document.getElementById('purecloud-webchat-js');

				// Skip injecting script tag if it's already been injected. 
				if (chatScript.getAttribute('src') != null) {
					this.openChatWindow();
					return;
				} else {
					// Once a script has been loaded, it cannot be unloaded. 
					// Therefore, we must prevent the user from choosing another deployment until the page is reloaded.
					$('#deployment-select-container select').prop('disabled', true);
				}

				// Inject deployment script
				chatScript.async = true;
				chatScript.setAttribute('type', 'text/javascript');
				chatScript.setAttribute('region', this.get('chatRegion'));
				if (this.get('chatEnv') !== '')
					chatScript.setAttribute('env', this.get('chatEnv'));
				chatScript.setAttribute('org-guid', this.get('org').id);
				chatScript.setAttribute('deployment-key', this.get('deployment'));
				chatScript.setAttribute('src', `https://apps.${this.get('chatEnvironment')}/webchat/jsapi-v1.js`);
				chatScript.addEventListener('error', () => this.setError('Error loading script.'));
				chatScript.addEventListener('abort', () => this.setError('Script loading aborted.'));
				chatScript.addEventListener('load', this.openChatWindow.bind(this));
			} catch(err) {
				this.setError(err);
			}
		},
		populate() {
			var chance = new Chance();

			this.set('firstName', chance.first());
			this.set('lastName', chance.last());
			this.set('address', chance.address());
			this.set('city', chance.city());
			this.set('state', chance.state());
			this.set('zip', chance.zip());
			this.set('phone', chance.phone());
			this.set('locale', 'en');
			this.set('welcomeMessage', 'Thanks for chatting using the dev tools chat page.');
		},
		createDeployment() {
			this.setError();
			this.get('webChatService').createDeployment()
				.then((newDeploymentId) => {
					let storage = this.get('storageService');
					let savedData = storage.localStorageGet('webChatParams');
					if (savedData && savedData.deployment)
						this.set('deployment', savedData.deployment);
					else
						this.set('deployment', newDeploymentId);
				})
				.catch((err) => {
					this.setError(err);
				});
		}
	}
});
