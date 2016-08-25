import { consoleMessageHasObject } from 'developer-tools/helpers/console-message-has-object';
import { module, test } from 'qunit';

module('Unit | Helper | console-message-has-object');

test('it works with null object', function(assert) {
    let result = consoleMessageHasObject([null]);
    assert.equal(result , false);
});

test('it works with no objects', function(assert) {

    var message = {
        messageParams: [
            {param: 1, isObject: false},
            {param: "a", isObject: false},
            {param: 22.22, isObject: false}
        ]
    };

    let result = consoleMessageHasObject([message]);
    assert.equal(result , false);
});



test("identifies an object", function(assert) {
    var message = {
        messageParams: [
            {param: 1, isObject: false},
            {param: {}, isObject: true}
        ]
    };

    let result = consoleMessageHasObject([message]);
    assert.ok(result);
});
