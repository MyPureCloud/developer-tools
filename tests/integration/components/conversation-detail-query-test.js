import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('conversation-detail-query', 'Integration | Component | conversation detail query', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{conversation-detail-query}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#conversation-detail-query}}
      template block text
    {{/conversation-detail-query}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
