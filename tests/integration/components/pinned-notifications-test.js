import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const pureCloudStub = Ember.Service.extend({
    session: null,

    notificationsApi(){
        return {
            postNotificationsChannels(){
                return {
                    then(){}
                };
            },
            getNotificationsAvailabletopics(){
                return {
                    then(){}
                };
            }
        };
    },
    me: null
});

moduleForComponent('pinned-notifications', 'Integration | Component | pinned notifications', {
  integration: true,
  beforeEach: function () {
    this.register('service:purecloud', pureCloudStub);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pinned-notifications}}`);

  assert.equal(this.$().text().trim(), '');

});
