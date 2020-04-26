import Ember from 'ember';

export default Ember.Component.extend({
	selectedAvailableItems: [],
	selectedSelectedItems: [],

	actions: {
		selectAvailable(Items) {
			this.set('selectedAvailableItems', Ember.$(Items.target).val());
		},
		selectSelected(Items) {
			this.set('selectedSelectedItems', Ember.$(Items.target).val());
		},
		selectItems() {
			let selectedAvailable = this.get('selectedAvailableItems');
			let availableItems = this.get('availableItems');

			let selectedItems = this.get('selectedItems').concat(selectedAvailable);

			for (let x = 0; x < selectedAvailable.length; x++) {
				availableItems.removeObject(selectedAvailable[x]);
			}

			this.set('availableItems', availableItems);
			this.set('selectedItems', selectedItems);
		},
		removeSelectedItems() {
			let selectedSelectedItems = this.get('selectedSelectedItems');
			let selectedItems = this.get('selectedItems');

			let availableItems = this.get('availableItems').concat(selectedSelectedItems);

			for (let x = 0; x < selectedSelectedItems.length; x++) {
				selectedItems.removeObject(selectedSelectedItems[x]);
			}

			this.set('availableItems', availableItems);
			this.set('selectedItems', selectedItems);
		}
	}
});
