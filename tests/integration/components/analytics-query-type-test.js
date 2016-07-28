import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const pureCloudStub = Ember.Service.extend({
    session: null,

    notificationsApi(){
        return {};
    },
    analyticsApi(){
        return {};
    },
    orgApi(){
        return {};
    },
    routingApi(){
        return {
            getQueues(){
                return {
                    then(){}
                };
            }
        };
    },
    usersApi(){
        return {
            getUsers(){
                return {
                    then(){}
                };
            }
        };
    },
    me: null
});

moduleForComponent('analytics-query-type', 'Integration | Component | analytics query type', {
  integration: true,
  beforeEach: function () {
    this.register('service:purecloud', pureCloudStub);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{analytics-query-type}}`);

  assert.equal(this.$().text().trim(), '');

});
