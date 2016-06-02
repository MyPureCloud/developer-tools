import Ember from 'ember';

export default Ember.Service.extend({
    idList: [],
    purecloud: Ember.inject.service(),

    init() {
        this._super(...arguments);

        var notifications = purecloud.notificationsApi();
        console.log("got notificaionat" + notifications);
    },
    subscribe(id){
        this.get('idList').pushObject(id);
    },
    unsubscribeAll(){
        this.get('idList').clear();)
    }
});
