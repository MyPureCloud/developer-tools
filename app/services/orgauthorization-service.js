import Ember from 'ember';
import config from '../config/environment';
import {purecloudEnvironmentTld, purecloudEnvironment} from '../utils/purecloud-environment';

var  computed = Ember.computed;

export default Ember.Service.extend({
	purecloud: Ember.inject.service(),
	hasTrustedOrgs: false,
	init() {
		this._super(...arguments);

		let self = this;

		let orgAuthApi = self.get('purecloud').orgAuthorizationApi();
		
        orgAuthApi.getOrgauthorizationTrustors().then(function(result){
			if(!result || !result.entities){
				return;
			}

			let trusts = [];

			result.entities.forEach((trust)=>{
				if(trust.enabled){
					trusts.push(trust.organization);
				}
			});

			self.set("orgTrusts", trusts);
			self.set("isTrustedOrg", trusts.length > 0);
        });	
	},
	
	switchToOrg(orgId){
		let oauthConfig = config.oauthProps[purecloudEnvironment()];

		let env = purecloudEnvironmentTld();
		let me = this.get('purecloud').get('me');

		let redirect = `https://login.${env}/oauth/authorize?client_id=${oauthConfig.clientId}&response_type=token&redirect_uri=${oauthConfig.redirect}&target=${orgId}`;
		window.location.replace(redirect);
	},

	isInTrustedOrg: computed('purecloud.me', function() {
		let me = this.get('purecloud').get('me');
        
        if(!me){
            return false;
        }

        if(me.token && me.token.organization && me.token.homeOrganization){
            return me.token.organization.id !== me.token.homeOrganization.id;
        }    
       
        return false;
    }),
});
