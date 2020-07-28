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
            getRoutingQueues(){
                return new Ember.RSVP.Promise(function(resolve){
                        resolve({
                            entities:[]
                        });
                    });

            }
        };
    },
    usersApi(){
        return {};
    },
    me: null
});

moduleForComponent('analytics-query-predicate', 'Integration | Component | analytics query predicate', {
  integration: true,
  beforeEach: function () {
    this.register('service:purecloud', pureCloudStub);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(hbs`{{analytics-query-predicate}}`);
    
    assert.notEqual(this.$().text().trim(), '');


});
