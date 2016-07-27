import Ember from 'ember';

export default Ember.Component.extend({
    rangeStart:0,
    rangeEnd:0,
    init: function(){
        this._super(...arguments);

        let range = this.get("range");
        if(range){
            this.set("rangeStart", range.gte);
            this.set("rangeEnd", range.lt);
        }
    },
    propertyChanged: Ember.observer("rangeStart", "rangeEnd", function() {
        let range = {
            gte: this.get("rangeStart"),
            lt: this.get("rangeEnd")
        };

        this.set("value", range);
    }),
});
