import Ember from 'ember';
import config from '../config/environment';
import {purecloudEnvironmentTld, purecloudEnvironment} from '../utils/purecloud-environment';

var  computed = Ember.computed;

export default Ember.Service.extend({
	purecloud: Ember.inject.service(),
	hasTrustedOrgs: false,
	orgTrusts:[],

	switchToOrg(orgId){
		let oauthConfig = config.oauthProps[purecloudEnvironment()];

		let env = purecloudEnvironmentTld();
		let me = this.get('purecloud').get('me');

		let redirect = `https://login.${env}/oauth/authorize?client_id=${oauthConfig.clientId}&response_type=token&redirect_uri=${oauthConfig.redirect}&target=${orgId}`;
		window.location.replace(redirect);
	},
	getTrustedOrgs: Ember.observer('purecloud.me', function() {
		this.orgTrusts.clear();

		let me = this.get('purecloud').get('me');

		if(!me || !me.trustors){
            return false;
		}

		me.trustors.forEach((trust)=>{
			if(trust.enabled){
				this.orgTrusts.pushObject(trust.organization);
			}
		});
    this.orgTrusts = this.orgTrusts.sortBy("name");

		this.set("isTrustedOrg", me.trustors.length > 0);

	}),
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
