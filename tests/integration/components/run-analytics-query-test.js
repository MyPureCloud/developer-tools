import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('run-analytics-query', 'Integration | Component | run analytics query', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{run-analytics-query}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#run-analytics-query}}
      template block text
    {{/run-analytics-query}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
