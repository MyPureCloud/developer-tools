import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flow-aggregate-query', 'Integration | Component | flow aggregate query', {
  integration: true
});

test('it renders', function(assert) {
  
  this.render(hbs`{{flow-aggregate-query}}`);

  assert.notEqual(this.$().text().trim(), '');
});
