import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pinned-notifications', 'Integration | Component | pinned notifications', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pinned-notifications}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pinned-notifications}}
      template block text
    {{/pinned-notifications}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
