import Ember from 'ember';
import PurecloudSessionInitializer from 'developer-tools/initializers/purecloud-session';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | purecloud session', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  PurecloudSessionInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
