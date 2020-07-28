import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:screenshare', 'Unit | Controller | screenshare', {
  // Specify the other units that are required for this test.
  needs: ['service:purecloud','service:notificationService','service:websockets','service:analyticsService','service:webChatService','service:storageService']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
