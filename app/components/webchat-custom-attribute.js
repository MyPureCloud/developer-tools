import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        deleteClicked() {
            this.get('onDeleteClicked')();
        }
    }
});
