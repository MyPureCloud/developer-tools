import { moduleFor, test } from 'ember-qunit';

moduleFor('service:analytics-value-service', 'Unit | Service | analytics value service' ,{
    needs : ['service:swaggerService']
});

test('filter tSegmentDuration', function(assert) {
    let service = this.subject();
    let result = service.filteredMetrics('tSegmentDuration');
    assert.equal(result.length, 1);
    assert.equal(result[0],'tSegmentDuration');
});


test('filter t.*', function(assert) {
    let service = this.subject();
    let result = service.filteredMetrics('t.*');
    assert.ok(result.length > 1);
});
