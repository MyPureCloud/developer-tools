import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('analytics-query-groupby', 'Integration | Component | analytics query groupby', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{analytics-query-groupby}}`);

  assert.notEqual(this.$().text().trim(), '');

});
