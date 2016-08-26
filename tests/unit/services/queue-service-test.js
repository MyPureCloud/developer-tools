
import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

var entityList = [];
var nextUri = null;



moduleFor('service:queue-service', 'Unit | Service | queue service', {
    beforeEach: function () {
        let purecloudStub = Ember.Service.extend({
            session: {
            get: function(){
                return new Ember.RSVP.Promise.resolve(function(resolve){
                    resolve({
                        entities:[],
                        nextUri: null
                    });
                });
            }
        },
            routingApi : function(){
                return {
                    getQueues: function(){
                        return new Ember.RSVP.Promise(function(resolve){
                            resolve({
                                entities:entityList,
                                nextUri: nextUri
                            });
                        });
                    }
                };
            }
        });

        this.register('service:purecloud', purecloudStub);
        this.inject.service('purecloud', { as: 'purecloud' });
    }
});

test('can process empty page', function(assert) {
    assert.expect(1);

    let service = this.subject();
    service.updateQueuesFromPureCloud().then(function(){
        assert.equal(service.queues.length,  0);
    });
});

test('can process results', function(assert) {
    assert.expect(1);

    entityList = [
        {
            name: 'test',
            id: 'id'
        }
    ];
    let service = this.subject();
    service.updateQueuesFromPureCloud().then(function(){
        assert.equal(service.queues.length,  1);
    });


});
