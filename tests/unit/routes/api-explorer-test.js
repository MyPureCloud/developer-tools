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
    needs: ['service:purecloud','service:notificationService','service:websockets','service:analyticsService'],
    beforeEach: function () {
          this.register('service:platformClient', purecloudStub);
          this.inject.service('platformClient', { as: 'platformClient' });

      }
});
