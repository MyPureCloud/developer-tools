import { moduleFor, test } from 'ember-qunit';

moduleFor('route:search-query-builder', 'Unit | Route | search query builder', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  try {
    let route = this.subject();
    console.log("this is the search-query-builder test");
    assert.ok(route);
  } catch(err) {
    console.log(err.stack);
  }
});
