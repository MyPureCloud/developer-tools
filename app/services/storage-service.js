import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented,{
    localStorageSet(key, value){
        try{
            if (typeof window.localStorage !== 'undefined') {
                window.localStorage["developertools-" + key] = value;
            }
        }catch(ex){

        }
    },
    localStorageGet(key){
        try{
            if (typeof window.localStorage !== 'undefined') {
                return window.localStorage["developertools-"  +key];
            }
        }catch(ex){

        }

        return null;
    }
});
