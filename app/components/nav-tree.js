import Ember from 'ember';

export default Ember.Component.extend({
    purecloud: Ember.inject.service(),
    actions:{
        logOut(){
            this.get('purecloud').get("session").logout();

            /*if(window && window.localStorage){
                delete window.localStorage.authtoken;
            }

            window.location.reload();*/
        }
    }
});
