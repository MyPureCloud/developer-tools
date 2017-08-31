import Ember from 'ember';

export default Ember.Component.extend({
    range:{},
    gte: 0,
    lt: 0,
    metric:"",
    metrics: [],
    analyticsValueService: Ember.inject.service(),
    init(){
        this._super(...arguments);
        this.get("analyticsValueService").get("metrics").forEach((m)=>{
            if (m[0] == "t"){
                this.metrics.pushObject(m);
            }
        })
    },
    didReceiveAttrs() {
        this._super(...arguments);

        let viewRef = this.get("viewRef");
        if(viewRef){
            this.set("range", viewRef.range);
            this.set("gte", viewRef.range.gte);
            this.set("lt", viewRef.range.lt);
            this.set("name", viewRef.name);
        }

        this.get("metric");
    },
    _observeChanges: Ember.observer('metric', 'range','gte', 'lt', 'name', function() {
        let name = this.get("name");

        let viewRef = this.get("viewRef");
        Ember.set(viewRef,'name', name);
        Ember.set(viewRef,'target', this.get("metric"));
        Ember.set(viewRef,'range', {
            gte: this.get('gte'),
            lt: this.get('lt'),
        });

    }),
    actions:{
        delete(){
            this.get("deleteView")(this.get("index"));
        }
    }
});
