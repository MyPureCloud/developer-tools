import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flow-observation-query', 'Integration | Component | flow observation query', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{flow-observation-query}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#flow-observation-query}}
      template block text
    {{/flow-observation-query}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
