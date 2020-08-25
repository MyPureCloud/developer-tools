import { moduleFor, test } from 'ember-qunit';
import purecloudMock from '../purecloud-mock';

moduleFor('controller:search-query-builder', 'Unit | Controller | search query builder', {

  beforeEach: function() {
    this.register('service:purecloud', purecloudMock);
    this.inject.service('purecloud', { as: 'purecloud' });
  },

  // Specify the other units that are required for this test.
  needs: ['service:notificationService','service:websockets','service:analyticsService']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
