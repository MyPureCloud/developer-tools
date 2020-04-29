/* global ININ CXBus */
/* global $ */
import Ember from 'ember';
import Chance from 'npm:chance';
import { purecloudEnvironmentTld } from '../utils/purecloud-environment';
import config from '../config/environment';

var computed = Ember.computed;

export default Ember.Controller.extend({
	purecloud: Ember.inject.service(),
	storageService: Ember.inject.service(),
	queueService: Ember.inject.service(),
	webChatService: Ember.inject.service(),
	openInNewWindow: true,
	isInChat: false,
	org: null,
	firstName: '',
	lastName: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	phone: '',
	email: '',
	subject: '',
	queue: '',
	locale: 'en',
	field1name: '',
	field1value: '',
	field2name: '',
	field2value: '',
	field3name: '',
	field3value: '',
	customAttributes: [],
	error: '',
	customPlugin: undefined,
	environmentTld: computed('deployment', function() {
		return purecloudEnvironmentTld();
	}),
	webChatVersion: computed('deployment', 'webChatService.deploymentCount', function() {
		const deploymentId = this.get('deployment');
		const deployment = this.get('deployments').find((d) => d.id === deploymentId);
		return !deployment || !deployment.isV2 ? '1' : '2';
	}),
	isV2: computed('deployment', 'webChatService.deploymentCount', function() {
		return this.get('webChatVersion') === '2';
	}),
	isV1: computed('deployment', 'webChatService.deploymentCount', function() {
		return this.get('webChatVersion') !== '2';
	}),
	errorVisibility: computed('error', function() {
		const error = this.get('error');
		return !error || error == '' ? 'hidden' : '';
	}),
	welcomeMessage: 'Thanks for chatting using the dev tools chat page.',
	chatEnvironment: computed('purecloud.environment', function() {
		return this.get('purecloud').get('environment');
	}),
	chatRegion: computed('purecloud.environment', function() {
		let environment = this.get('purecloud').get('environment');
		if (!environment || environment === '') return;

		if (environment.endsWith('.jp')) return 'ap-northeast-1';
		else if (environment.endsWith('.com.au')) return 'ap-southeast-2';
		else if (environment.endsWith('.ie')) return 'eu-west-1';
		else if (environment.endsWith('.de')) return 'eu-central-1';
		else if (environment.endsWith('mypurecloud.com')) return 'us-east-1';
		else if (environment.endsWith('usw2.pure.cloud')) return 'us-west-2';
		else if (environment.endsWith('cac1.pure.cloud')) return 'ca-central-1';
		else if (environment.endsWith('apne2.pure.cloud')) return 'ap-northeast-2';
		else if (environment.endsWith('euw2.pure.cloud')) return 'eu-west-2';
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
	init() {
		this._super(...arguments);

		let orgApi = this.get('purecloud').orgApi();

		orgApi
			.getOrganizationsMe()
			.then((result) => {
				this.set('org', result);

				let storage = this.get('storageService');
				let savedData = storage.localStorageGet('webChatParams');

				if (savedData) {
					this.set('firstName', savedData.firstName);
					this.set('lastName', savedData.lastName);
					this.set('address', savedData.address);
					this.set('city', savedData.city);
					this.set('state', savedData.state);
					this.set('zip', savedData.zip);
					this.set('phone', savedData.phone);
					this.set('email', savedData.email);
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
					this.set('customAttributes', savedData.customAttributes || []);
					this.set('subject', savedData.subject);

					let storage = this.get('storageService');
					if (storage.localStorageGet('relate.ui.useEmailAndPhoneForRWPLookupInWebChat')) {
						this.set('email', savedData.email);
						this.set('showEmailField', true);
					}

					if (typeof savedData.openInNewWindow !== 'undefined') {
						this.set('openInNewWindow', savedData.openInNewWindow);
					}
				}

				// Get the user's authorization. purecloud.me isn't populated yet.
				// Not using the Authorization API here because that will return a 404 if the user doesn't have permission to view their permissions.
				return this.get('purecloud')
					.usersApi()
					.getUsersMe({ expand: ['authorization'] });
			})
			.then((me) => {
				// Be sure we got permissions
				let permissionsErr = '';
				if (!me.authorization) {
					this.setError(
						'Unable to validate permissions. You may not see deployments or queues in the dropdowns. You\'re probably missing the permission "authorization:grant:view".'
					);
					return;
				}

				// Check for permissions
				let hasReadDeployment = false;
				let hasViewQueues = false;
				me.authorization.permissions.forEach((p) => {
					// Must check for startswith because of how permissions look with divisions. Can't use exact match here.
					if (p.startsWith('webchat:deployment:read')) hasReadDeployment = true;
					if (p.startsWith('routing:queue:view')) hasViewQueues = true;
				});

				// Set error messages
				if (!hasReadDeployment) permissionsErr += 'Unable to list deployments. Missing permission: webchat:deployment:read <br />';
				if (!hasViewQueues) permissionsErr += 'Unable to list queues. Missing permission: routing:queue:view <br />';

				this.setError(permissionsErr);
			})
			.catch((err) => this.setError(err));
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
	queuesLoading: computed('queueService.isLoadingQueues', function() {
		return this.get('queueService').get('isLoadingQueues');
	}),

	chatConfig: computed(
		'deployment',
		'webChatService.deploymentCount',
		'org',
		'openInNewWindow',
		'queue',
		'firstName',
		'lastName',
		'address',
		'city',
		'zip',
		'state',
		'phone',
		'email',
		'locale',
		'welcomeMessage',
		'field1name',
		'field1value',
		'field2name',
		'field2value',
		'field3name',
		'field3value',
		'customAttributes.@each.name',
		'customAttributes.@each.value',
		function() {
			try {
				let environment = purecloudEnvironmentTld();
				let companyLogo = $('#companyLogo').attr('src');
				let companyLogoSmall = $('#companyLogoSmall').attr('src');
				let agentAvatar = $('#agentAvatar').attr('src');

				let resourcePrefix = window.location.origin;
				if (config.APP.urlprefix) {
					resourcePrefix = config.APP.urlprefix;
				}

				if (typeof companyLogo !== 'undefined' && companyLogo[0] !== 'h') {
					companyLogo = resourcePrefix + companyLogo;
					companyLogoSmall = resourcePrefix + companyLogoSmall;
					agentAvatar = resourcePrefix + agentAvatar;
				}

				let org = this.get('org');
				if (org === null) {
					return '{}';
				}

				let chatData = {
					firstName: this.get('firstName'),
					lastName: this.get('lastName'),
					addressStreet: this.get('address'),
					addressCity: this.get('city'),
					addressPostalCode: this.get('zip'),
					addressState: this.get('state'),
					phoneNumber: this.get('phone'),
					customField1Label: this.get('field1name'),
					customField1: this.get('field1value'),
					customField2Label: this.get('field2name'),
					customField2: this.get('field2value'),
					customField3Label: this.get('field3name'),
					customField3: this.get('field3value')
				};

				let storage = this.get('storageService');
				if (storage.localStorageGet('relate.ui.useEmailAndPhoneForRWPLookupInWebChat')) {
					chatData.email = this.get('email');
				}

				// Add custom fields if V1
				if (this.get('isV1')) {
					const customAttributes = this.get('customAttributes');
					for (let attribute of customAttributes) {
						if (attribute.name != '') {
							chatData[attribute.name] = attribute.value;
						}
					}
				}

				let chatConfig;
				if (this.get('isV1')) {
					chatConfig = {
						// Web chat application URL
						webchatAppUrl: 'https://apps.' + environment + '/webchat',

						// Web chat service URL
						webchatServiceUrl: 'https://realtime.' + environment + ':443',

						orgId: this.get('org').thirdPartyOrgId,
						orgGuid: this.get('org').id,

						// Organization name
						orgName: this.get('org').thirdPartyOrgName,

						queueName: this.get('queue'),

						// Log level
						logLevel: 'DEBUG',

						// Locale code
						locale: this.get('locale'),

						// Data that will be included with interaction
						data: chatData,

						// Logo used at the top of the chat window
						companyLogo: {
							width: 600,
							height: 149,
							url: companyLogo
						},

						// Logo used within the chat window
						companyLogoSmall: {
							width: 25,
							height: 25,
							url: companyLogoSmall
						},

						// Image used for agent
						agentAvatar: {
							width: 462,
							height: 462,
							url: agentAvatar
						},

						// Text displayed with chat window is displayed
						welcomeMessage: this.get('welcomeMessage'),

						// CSS class applied to the chat window
						cssClass: 'webchat-frame',

						// Custom style applied to the chat window
						css: {
							width: '100%',
							height: '100%'
						}
					};
					return JSON.stringify(chatConfig, null, 2);
				} else {
					// Remove built-ins from userData
					delete chatData.firstName;
					delete chatData.lastName;
					delete chatData.email;
					delete chatData.subject;

					chatConfig = {
						transport: {
							type: 'purecloud-v2-sockets',
							dataURL: `https://api.${environment}`,
							deploymentKey: this.get('deployment'),
							orgGuid: this.get('org').id,
							interactionData: {
								routing: {
									targetType: 'QUEUE',
									targetAddress: this.get('queue'),
									priority: 2
								}
							}
						},
						userData: chatData
					};

					// Indent 2 extra spaces
					return JSON.stringify(chatConfig, null, 2).replace(/\n/gim, '\n  ');
				}
			} catch (ex) {
				console.error(ex);
			}
			return '{}';
		}
	),
	v2ConfigDisplay: computed('chatConfig', function() {
		return JSON.stringify({ widgets: { webchat: JSON.parse(this.get('chatConfig')) } }, null, 2).replace(/\n/gim, '\n  ');
	}),
	advancedConfig: computed(
		'deployment',
		'webChatService.deploymentCount',
		'org',
		'subject',
		'openInNewWindow',
		'queue',
		'firstName',
		'lastName',
		'address',
		'city',
		'zip',
		'state',
		'phone',
		'email',
		'locale',
		'welcomeMessage',
		'field1name',
		'field1value',
		'field2name',
		'field2value',
		'field3name',
		'field3value',
		'customAttributes.@each.name',
		'customAttributes.@each.value',
		function() {
			const config = {
				form: {
					autoSubmit: false,
					firstname: this.get('firstName'),
					lastname: this.get('lastName'),
					email: this.get('email'),
					subject: this.get('subject')
				},
				formJSON: {
					wrapper: '<table></table>',
					inputs: [
						// Default fields
						{
							id: 'cx_webchat_form_firstname',
							name: 'firstname',
							maxlength: '100',
							placeholder: 'Required',
							label: 'First Name'
						},
						{
							id: 'cx_webchat_form_lastname',
							name: 'lastname',
							maxlength: '100',
							placeholder: 'Required',
							label: 'Last Name'
						},
						{
							id: 'cx_webchat_form_email',
							name: 'email',
							maxlength: '100',
							placeholder: 'Optional',
							label: 'Email'
						},
						{
							id: 'cx_webchat_form_subject',
							name: 'subject',
							maxlength: '100',
							placeholder: 'Optional',
							label: 'Subject'
						}
					]
				}
			};

			const customAttributes = this.get('customAttributes');
			for (let attribute of customAttributes) {
				if (attribute.name != '') {
					config.formJSON.inputs.push({
						id: `cx_webchat_form_${attribute.name.toLowerCase().replace(/[^a-z0-9]/gi, '_')}`,
						name: attribute.name.replace(/\s|[^a-z0-9-_]/gi, ''),
						maxlength: '100',
						placeholder: 'Custom data placeholder',
						label: attribute.name,
						value: attribute.value
					});
				}
			}

			// Indent extra 4 spaces
			return JSON.stringify(config, null, 2).replace(/\n/gim, '\n    ');
		}
	),
	setError(err) {
		if (!err) {
			this.set('error', '');
			return;
		}

		console.error(err);
		if (err.body && err.body.message) this.set('error', err.body.message);
		else if (err.message) this.set('error', err.message);
		else if (typeof err === 'string') this.set('error', err.htmlSafe());
		else this.set('error', 'An error has occurred');
	},
	openChatWindow() {
		try {
			let chatConfig = JSON.parse(this.get('chatConfig'));

			ININ.webchat.create(chatConfig, (err, webchat) => {
				if (err) {
					this.setError(err);
					return;
				}

				if (this.get('openInNewWindow')) {
					webchat.renderPopup({
						width: 400,
						height: 400,
						title: 'PureCloud Developer Tools Web Chat'
					});
				} else {
					this.set('isInChat', true);
					webchat.renderFrame({
						containerEl: 'chat-container'
					});

					let self = this;
					webchat.chatEnded = function() {
						self.set('isInChat', false);
						$('#chat-container').html('');
					};
				}
			});

			this.saveData();
		} catch (err) {
			this.setError(err);
		}
	},
	openChatWindowV2() {
		try {
			console.log('Starting V2 chat...');
			if (!this.get('customPlugin')) this.set('customPlugin', CXBus.registerPlugin('Custom'));
			const customPlugin = this.get('customPlugin');
			customPlugin.command('WebChat.open', JSON.parse(this.get('advancedConfig')));

			this.saveData();
		} catch (err) {
			this.setError(err);
		}
	},
	saveData() {
		try {
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
				customAttributes: this.get('customAttributes'),
				openInNewWindow: this.get('openInNewWindow'),
				subject: this.get('subject')
			};

			let storage = this.get('storageService');
			if (storage.localStorageGet('relate.ui.useEmailAndPhoneForRWPLookupInWebChat')) {
				savedData.email = this.get('email');
			}

			storage.localStorageSet('webChatParams', savedData);
		} catch (err) {
			this.setError('Error saving chat config data');
			console.log(err);
		}
	},
	actions: {
		startChat() {
			try {
				this.setError();

				// Validation
				let chatConfig = JSON.parse(this.get('chatConfig'));
				if (!chatConfig.queueName || chatConfig.queueName == '') throw new Error('You must select a queue before starting the chat');
				if (!this.deployment || this.deployment == '') throw new Error('You must select a deployment before starting the chat');

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
				if (this.get('chatEnv') !== '') chatScript.setAttribute('env', this.get('chatEnv'));
				chatScript.setAttribute('org-guid', this.get('org').id);
				chatScript.setAttribute('deployment-key', this.get('deployment'));
				chatScript.setAttribute('src', `https://apps.${this.get('chatEnvironment')}/webchat/jsapi-v1.js`);
				chatScript.addEventListener('error', () => this.setError('Error loading script.'));
				chatScript.addEventListener('abort', () => this.setError('Script loading aborted.'));
				chatScript.addEventListener('load', this.openChatWindow.bind(this));
			} catch (err) {
				this.setError(err);
			}
		},
		startChatV2() {
			this.setError();

			// Validation
			let chatConfig = JSON.parse(this.get('chatConfig'));
			console.log(chatConfig);

			if (!chatConfig.transport.interactionData.routing.targetAddress || chatConfig.transport.interactionData.routing.targetAddress == '')
				throw new Error('You must select a queue before starting the chat');
			if (!chatConfig.transport.deploymentKey || chatConfig.transport.deploymentKey == '')
				throw new Error('You must select a deployment before starting the chat');

			const chatScript = document.getElementById('purecloud-webchat-js');

			// Skip injecting script tag if it's already been injected.
			if (chatScript.getAttribute('src') != null) {
				this.openChatWindowV2();
				return;
			} else {
				// Once a script has been loaded, it cannot be unloaded.
				// Therefore, we must prevent the user from choosing another deployment until the page is reloaded.
				$('#deployment-select-container select').prop('disabled', true);
			}

			// Inject deployment script
			chatScript.setAttribute('src', `https://apps.${this.get('environmentTld')}/widgets/9.0/cxbus.min.js`);
			chatScript.addEventListener('error', () => this.setError('Error loading script.'));
			chatScript.addEventListener('abort', () => this.setError('Script loading aborted.'));
			chatScript.addEventListener('load', () => {
				// Set basic CXBus config
				CXBus.configure({
					debug: false,
					pluginsPath: `https://apps.${this.get('environmentTld')}/widgets/9.0/plugins/`
				});

				// Set webchat config
				if (!window._genesys) window._genesys = {};
				if (!window._genesys.widgets) window._genesys.widgets = {};
				window._genesys.widgets.webchat = chatConfig;

				// Load widgets-core library
				CXBus.loadPlugin('widgets-core').done(() => {
					// Only start chat after it has been loaded
					this.openChatWindowV2();
				});
			});
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
			this.set('email', chance.email());
			this.set('locale', 'en');
			this.set('welcomeMessage', 'Thanks for chatting using the dev tools chat page.');
		},
		createDeployment() {
			this.setError();
			this.get('webChatService')
				.createDeployment()
				.then((newDeploymentId) => {
					let storage = this.get('storageService');
					let savedData = storage.localStorageGet('webChatParams');
					if (savedData && savedData.deployment) this.set('deployment', savedData.deployment);
					else this.set('deployment', newDeploymentId);
				})
				.catch((err) => {
					this.setError(err);
				});
		},
		addCustomAttribute() {
			let customAttributes = this.get('customAttributes');
			customAttributes.pushObject({
				name: '',
				value: ''
			});
			this.set('customAttributes', customAttributes);
		},
		deleteCustomAttribute(attribute) {
			this.get('customAttributes').removeObject(attribute);
		}
	}
});
