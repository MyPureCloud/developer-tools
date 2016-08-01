import { moduleForComponent, test } from 'ember-qunit';
import modules from 'utils/dev-tools-modules';

moduleForComponent('dev-tools-modules', 'Integration | Util | dev-tools-modules', {
  integration: true
});

test('it has modules', function(assert) {

  assert.equal(modules.length> 0, true);

  for(let x=0; x< modules.length; x++){
      let module = modules[x];

      assert.notEqual(module.name, null);
      assert.notEqual(module.path, null);
      assert.notEqual(module.icon, null);
      assert.notEqual(module.description, null);
  }

});
