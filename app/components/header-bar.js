import Ember from 'ember';
import toolsModules from '../utils/dev-tools-modules';

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
            this.get('purecloud').get("session").logout();
        }
    }
});
