import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:search-query-builder', 'Unit | Controller | search query builder', {
  // Specify the other units that are required for this test.
  needs: ['service:purecloud','service:notificationService','service:websockets','service:analyticsService']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
