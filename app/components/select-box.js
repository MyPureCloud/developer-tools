import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        selectItem:function(item){
            
            this.set("selectedItem", item);
        }
    }
});
