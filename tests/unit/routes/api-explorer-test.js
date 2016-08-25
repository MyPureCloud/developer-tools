import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

const fakeToken = "1234";

const purecloudStub = Ember.Service.extend({
    get: function() {
        return {
            options:{
                token: fakeToken
            }
        };
    }
});


moduleFor('route:api-explorer', 'Unit | Route | api explorer', {
    beforeEach: function () {
          this.register('service:purecloud', purecloudStub);
          this.inject.service('purecloud', { as: 'purecloud' });
      }
});

test('it exists', function(assert) {
  let route = this.subject();

  assert.ok(route.model().indexOf(`access_token=${fakeToken}`) > -1);
});
