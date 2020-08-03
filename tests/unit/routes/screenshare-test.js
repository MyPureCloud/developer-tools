import { moduleFor, test } from 'ember-qunit';
import purecloudMock from '../purecloud-mock';

moduleFor('route:screenshare', 'Unit | Route | screenshare', {
  // Specify the other units that are required for this test.
  
  beforeEach: function () {
    this.register('service:purecloud', purecloudMock);
    this.inject.service('purecloud', { as: 'purecloud' });
  },

  needs: ['service:webChatService', 'service:storageService']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
