import { moduleFor, test } from 'ember-qunit';
import purecloudMock from '../purecloud-mock'

moduleFor('controller:screenshare', 'Unit | Controller | screenshare', {

  beforeEach: function() {
    this.register('service:purecloud', purecloudMock);
    this.inject.service('purecloud', { as: 'purecloud' });
  },
  // Specify the other units that are required for this test.
  needs: ['service:notificationService','service:websockets','service:analyticsService','service:webChatService','service:storageService']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
