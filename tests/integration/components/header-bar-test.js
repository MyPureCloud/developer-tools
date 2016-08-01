import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const pureCloudStub = Ember.Service.extend({
    me: {}
});

moduleForComponent('header-bar', 'Integration | Component | header bar', {
  integration: true,
  beforeEach: function () {
    this.register('service:purecloud', pureCloudStub);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{header-bar}}`);

  assert.notEqual(this.$().text().trim(), '');

});
