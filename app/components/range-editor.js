import Ember from 'ember';

export default Ember.Component.extend({
    //range: {},
    lt: 0,
    gte: 0,
    // didReceiveAttrs() {
    //     this._super(...arguments);
    //
    //     let range = this.get("range");
    //     if(range){
    //         this.set("lt", range.lt);
    //         this.set("gte", range.gte);
    //     }
    // },
    // _observeChanges: Ember.observer('gte', 'lt', function() {
    //     debugger;
    //     let range = this.get("range");
    //     Ember.set(range,'lt', this.get("lt"));
    //     Ember.set(range,'gte', this.get("gte"));
    //
    // }),
});
