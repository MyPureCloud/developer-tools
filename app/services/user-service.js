
import Ember from 'ember';

export default Ember.Service.extend({
    purecloud: Ember.inject.service(),
    //jshint unused:true

    users: [],

    init() {
        this._super(...arguments);

        let self = this;
        let pureCloudSession = this.get("purecloud").get("session");

        let usersApi = self.get("purecloud").usersApi();

        function processPageOfUsers(results){

            self.users.addObjects(results.entities);

            if(results.nextUri){
                //get the next page of users directly
                pureCloudSession.get(results.nextUri).then(processPageOfUsers);
            }
        }
        usersApi.getUsers(40,0,null, 'name').then(processPageOfUsers);
    }
});
