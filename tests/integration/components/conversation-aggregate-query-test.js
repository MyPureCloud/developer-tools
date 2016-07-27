import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('conversation-aggregate-query', 'Integration | Component | conversation aggregate query', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{conversation-aggregate-query}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#conversation-aggregate-query}}
      template block text
    {{/conversation-aggregate-query}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
