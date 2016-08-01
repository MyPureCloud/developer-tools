import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const pureCloudStub = Ember.Service.extend({
    session: {
        options:{}
    },

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

moduleForComponent('code-editor', 'Integration | Component | code editor', {  integration: true,
  beforeEach: function () {
    this.register('service:purecloud', pureCloudStub);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{code-editor}}`);

  assert.notEqual(this.$().text().trim(), '');

});
