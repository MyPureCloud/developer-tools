import { moduleForComponent, test } from 'ember-qunit';
import toolsModules from 'developer-tools/utils/dev-tools-modules';

moduleForComponent('dev-tools-modules', 'Integration | Util | dev-tools-modules', {
  integration: true
});

test('it has modules', function(assert) {

  assert.equal(toolsModules.length> 0, true);

  for(let x=0; x< toolsModules.length; x++){
      let module = toolsModules[x];

      assert.notEqual(module.name, null);
      assert.notEqual(module.path, null);
      assert.notEqual(module.icon, null);
      assert.notEqual(module.description, null);
  }

});
