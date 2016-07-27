import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('analytics-query-range', 'Integration | Component | analytics query range', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{analytics-query-range}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#analytics-query-range}}
      template block text
    {{/analytics-query-range}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
