import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-box-advanced', 'Integration | Component | select box advanced', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select-box-advanced}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select-box-advanced}}
      template block text
    {{/select-box-advanced}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
