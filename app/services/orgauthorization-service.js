import Ember from 'ember';
import config from '../config/environment';
import {purecloudEnvironmentTld, purecloudEnvironment} from '../utils/purecloud-environment';

export default Ember.Service.extend({
	purecloud: Ember.inject.service(),
	hasTrustedOrgs: false,
	init() {
		this._super(...arguments);

		let self = this;

		let orgAuthApi = self.get('purecloud').orgAuthorizationApi();
		
        orgAuthApi.getOrgauthorizationTrustors().then(function(result){
			if(!result){
				return;
			}

			self.set("orgTrusts", result.entities);
			self.set("isTrustedOrg", result.entities && result.entities.length > 0);
        });	
	},
	
	switchToOrg(orgId){
		let oauthConfig = config.oauthProps[purecloudEnvironment()];

		let env = purecloudEnvironmentTld();
		let me = this.get('purecloud').get('me');

		let redirect = `https://login.${env}/oauth/authorize?client_id=${oauthConfig.clientId}&response_type=token&redirect_uri=${oauthConfig.redirect}&target=${orgId}`;
		window.location.replace(redirect);
	}
});
