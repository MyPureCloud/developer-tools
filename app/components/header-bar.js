import Ember from 'ember';
var  computed = Ember.computed;

export default Ember.Component.extend({
    purecloud: Ember.inject.service('purecloud'),

    me: computed('purecloud.me', function() {
        return this.get('purecloud').get('me');
    })
});
