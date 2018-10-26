import Ember from 'ember';
import toolsModules from '../utils/dev-tools-modules';
import config from '../config/environment';
import {purecloudEnvironmentTld, purecloudEnvironment} from '../utils/purecloud-environment';

var  computed = Ember.computed;

export default Ember.Component.extend({
    purecloud: Ember.inject.service('purecloud'),
    modules: toolsModules,
    routing: Ember.inject.service('-routing'),
    routeTitle: computed('routing.currentPath', function(){
        let route = this.get("routing").get("currentPath");
        for(let x=0;x < toolsModules.length; x++){
            let module = toolsModules[x];
            if(module.path === route){
                return "Developer Tools";
            }
        }

        return "Developer Tools";
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
    me: computed('purecloud.me', function() {
        return this.get('purecloud').get('me');
    }),

    meJson:computed('purecloud.me', function() {
        return JSON.stringify(this.get('purecloud').get('me'),null, "  ");
    }),

    showMe: false,
    actions: {
        toggleMe: function() {
            this.toggleProperty('showMe');
        },
        logOut(){
            this.get('purecloud').logout();
        },
        switchToHomeOrg(){
            let oauthConfig = config.oauthProps[purecloudEnvironment()];

            let env = purecloudEnvironmentTld();
            let me = this.get('purecloud').get('me');

            let redirect = `https://login.${env}/oauth/authorize?client_id=${oauthConfig.clientId}&response_type=token&redirect_uri=${oauthConfig.redirect}&target=${me.token.homeOrganization.id}`;
            window.location.replace(redirect);
        }
    }
});
