import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('webchat-custom-attribute', 'Integration | Component | webchat custom attribute', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{webchat-custom-attribute}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#webchat-custom-attribute}}
      template block text
    {{/webchat-custom-attribute}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
