import Ember from 'ember';

export default Ember.Component.extend({
    didReceiveAttrs() {
        this._super(...arguments);

        let viewRef = this.get("viewRef");
        if(viewRef){
            this.set("range", viewRef.range);
            this.set("gte", viewRef.range.gte);
            this.set("lt", viewRef.range.lt);
            this.set("name", viewRef.name);
        }
    },
    _observeChanges: Ember.observer('range','range.gte', 'range.lt', 'name', function() {
        let range = this.get("range");
        let name = this.get("name");

        let viewRef = this.get("viewRef");
        // viewRef.range = range;
        // viewRef.name = name;
        Ember.set(viewRef,'name', name);
        Ember.set(viewRef,'range', range);
        //Ember.set(viewRef,'range.gte', this.get('gte'));
        //Ember.set(viewRef,'range.lt', this.get('lt'));


    }),
});
