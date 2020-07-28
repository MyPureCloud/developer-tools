import { test } from 'ember-qunit';
import {module } from 'qunit';
import toolsModules from 'developer-tools/utils/dev-tools-modules';

module('Integration | Util | dev-tools-modules');

test('it has modules', function(assert) {

  try {
    assert.equal(toolsModules.length> 0, true);

    
    for(let x=0; x< toolsModules.length; x++){
      let module = toolsModules[x];
      
      assert.notEqual(module.name, null);
      assert.notEqual(module.path, null);
      assert.notEqual(module.icon, null);
      assert.notEqual(module.description, null);
    }
    
  } catch(err) {
    console.log(err.stack);
  }
});
