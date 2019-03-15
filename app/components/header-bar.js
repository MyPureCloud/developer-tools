import Ember from 'ember';
import toolsModules from '../utils/dev-tools-modules';

var  computed = Ember.computed;

export default Ember.Component.extend({
    purecloud: Ember.inject.service('purecloud'),
    modules: toolsModules,
    routing: Ember.inject.service('-routing'),
    orgauthorizationService: Ember.inject.service(),
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
    me: computed('purecloud.me', function() {
        return this.get('purecloud').get('me');
    }),

    meJson:computed('purecloud.me', function() {
        return JSON.stringify(this.get('purecloud').get('me'),null, "  ");
    }),

    profileImg: computed(function() {
      return (this.me.images && this.me.images[0].imageUri) || "assets/images/profile-default.svg"
    }),

    isStandalone: computed(function() {
      return window.location === window.parent.location
    }),

    showMe: false,
    showOrgTrusts: false,

    init() {
        this._super(...arguments);
        this.get("orgauthorizationService");

    },

    actions: {
        toggleMe: function() {
            this.set("showOrgTrusts", false);
            this.toggleProperty('showMe');
        },
        toggleTrustedOrgs: function() {
            this.set("showMe", false);
            this.toggleProperty('showOrgTrusts');
        },
        logOut(){
            this.get('purecloud').logout();
        },
        switchToOrgTrust(orgId){
            this.get("orgauthorizationService").switchToOrg(orgId);
        },
        switchToHomeOrg(){
            let me = this.get('purecloud').get('me');
            this.get("orgauthorizationService").switchToOrg(me.token.homeOrganization.id);
        }
    }
});
