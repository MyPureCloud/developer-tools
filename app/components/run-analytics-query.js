import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        execute(){
            this.get("runQuery")();
        }
    }
});
