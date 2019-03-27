import Ember from 'ember';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

const {
  computed,
  Controller,
  inject
} = Ember;

export default Controller.extend({
  purecloud: inject.service(),
  webChatService: inject.service(),
  storageService: inject.service(),

  logLevels: [
    {name: 'Debug', value: 'DEBUG'},
    {name: 'Info', value: 'INFO'},
    {name: 'Warn', value: 'WARN'},
    {name: 'Error', value: 'ERROR'},
    {name: 'Fatal', value: 'FATAL'}
  ],

  error: null,

  pcEnv: computed.reads('purecloud.environment'),

  errorVisibility: computed('error', function () {
    const error = this.get('error');
    return !error || error === '' ? 'hidden' : '';
  }),

  init () {
    this._super(...arguments);

    let environment = purecloudEnvironmentTld();
    this.set('locale', 'en');
    this.set('logLevel', this.get('logLevels.firstObject.value'));
    this.set('standAloneMode', true);
    this.set('cssClass', 'screenshare-frame');
    this.set('containerEl', 'screenshareContainer');
    this.set('webchatServiceUrl', `https://realtime.${environment}:443`);

    let orgApi = this.get('purecloud').orgApi();

    orgApi.getOrganizationsMe()
      .then(result => {
        this.set('org', result);

        // Get the user's authorization. purecloud.me isn't populated yet.
        // Not using the Authorization API here because that will return a 404 if the user doesn't have permission to view their permissions.
        return this.get('purecloud').usersApi().getUsersMe({
          expand: ['authorization']
        });
      })
      .then((me) => {
        // Be sure we got permissions
        let permissionsErr = '';
        if (!me.authorization) {
          this.setError('Unable to validate permissions.');
          return;
        }
        // Check for permissions
        let hasReadDeployment = false;
        me.authorization.permissions.forEach((p) => {
          // Must check for startswith because of how permissions look with divisions. Can't use exact match here.
          if (p.startsWith('webchat:deployment:read')) {
            hasReadDeployment = true;
          }
        });

        // Set error messages
        if (!hasReadDeployment) {
          permissionsErr += 'Unable to list deployments. Missing permission: webchat:deployment:read <br />';
        }

        this.setError(permissionsErr);
      })
      .catch((err) => this.setError(err));
  },

  setError (err) {
    this.set('error', err);
  },

  deployments: computed('webChatService.deployments', function () {
    return this.get('webChatService').get('deployments');
  }),

  needsDeployment: computed('webChatService.deploymentCount', function () {
    return this.get('webChatService').get('deploymentCount') === 0;
  }),

  additionalCssError: computed('verifiedCssJSON', 'additionalCss', function () {
    return this.get('additionalCss') && !this.get('verifiedCssJSON');
  }),

  verifiedCssJSON: computed('additionalCss', function () {
    const css = this.get('additionalCss');
    if (!css) {
      return '';
    }
    try {
      const obj = JSON.parse(css);
      return obj;
    } catch (err) {
      return '';
    }
  }),

  screenShareUrl: computed('org', 'locale', 'logLevel', 'standAloneMode', 'deployment', 'contentCssUrl', function () {
    if (!this.get('standAloneMode')) {
      return '';
    }

    let environment = purecloudEnvironmentTld();
    let url = `https://apps.${environment}/webchat/screenshare/#?`;
    url += `webchatServiceUrl=${encodeURIComponent(this.get('webchatServiceUrl'))}&logLevel=${this.get('logLevel')}`;
    url += `&orgId=${encodeURIComponent(this.get('org.thirdPartyOrgId'))}&orgGuid=${encodeURIComponent(this.get('org.id'))}`;
    url += `&orgName=${encodeURIComponent(this.get('org.thirdPartyOrgName'))}&webchatDeploymentKey=${this.get('deployment')}`;

    if (this.get('contentCssUrl')) {
      url += `&contentCssUrl=${encodeURIComponent(this.get('contentCssUrl'))}`;
    }

    return url;
  }),

  config: computed('org', 'locale', 'logLevel', 'contentCssUrl', 'standAloneMode', 'cssClass', 'verifiedCssJSON', 'deployment', function () {
    if (this.get('standAloneMode')) {
      return '';
    }
    let environment = purecloudEnvironmentTld();
    const obj = {
      webchatServiceUrl: this.get('webchatServiceUrl'),
      webchatAppUrl: `https://apps.${environment}/webchat`,
      orgId: this.get('org.thirdPartyOrgId'),
      orgName: this.get('org.thirdPartyOrgName'),
      logLevel: this.get('logLevel'),
      locale: this.get('locale'),
      orgGuid: this.get('org.id'),
      cssClass: this.get('cssClass'),
      css: this.get('verifiedCssJSON'),
      contentCssUrl: this.get('contentCssUrl'),
      standAloneApplication: this.get('standAloneMode'),
      webchatDeploymentKey: this.get('deployment')
    };

    return JSON.stringify(obj, null, 2);
  }),

  actions: {
    createDeployment () {
      this.setError();
      this.get('webChatService').createDeployment()
        .then((newDeploymentId) => {
          let storage = this.get('storageService');
          let savedData = storage.localStorageGet('webChatParams');
          if (savedData && savedData.deployment) {
            this.set('deployment', savedData.deployment);
          } else {
            this.set('deployment', newDeploymentId);
          }
        })
        .catch((err) => {
          this.setError(err);
        });
    },
    setStandAloneMode (value) {
      this.set('standAloneMode', value === 'true');
    }
  }
});
