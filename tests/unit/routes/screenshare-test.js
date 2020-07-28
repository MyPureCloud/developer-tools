import { moduleFor, test } from 'ember-qunit';

moduleFor('route:screenshare', 'Unit | Route | screenshare', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  try {
    let route = this.subject();
    console.log("this is the route test");
    assert.ok(route);
  } catch(err) {
    console.log(err.stack);
  }
});
