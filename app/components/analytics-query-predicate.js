import Ember from 'ember';
var observer = Ember.observer;
var  computed = Ember.computed;

export default Ember.Component.extend({
    classNames: ['predicate-section'],
    analyticsValueService: Ember.inject.service(),
    queueService: Ember.inject.service(),
    userService: Ember.inject.service(),
    //TODO: support queue ids, user Ids,
    init: function(){
        this.get("queueService"); //make sure it is ready

        this._super(...arguments);

        this.set("dimensions", this.get("analyticsValueService").get("dimensions"));
        this.set("propertyTypes", this.get("analyticsValueService").get("propertyTypes"));
        this.set("metrics", this.get("analyticsValueService").get("metrics"));
        this.set("operators", this.get("analyticsValueService").get("operators"));
        this.set("mediaTypes", this.get("analyticsValueService").get("mediaTypes"));

        let predicate = this.get("predicate");
        if(predicate){
            this.set("selectedType", predicate.type);
            this.set("lhsValue", predicate.dimension || predicate.metric || predicate.property);
            this.set("selectedOperator", predicate.operator);
            this.set("value", predicate.value);
        }
    },
    didReceiveAttrs() {
        this._super(...arguments);
        if(this.get("filterValueOverride") !== null){
            this.set("dimensions", this.get("filterValueOverride"));
            this.set("types", ["dimension"]);

        }
    },
    queues: computed('queueService.queues', function() {
       return this.get('queueService').get('queues');
    }),
    users: computed('userService.users', function() {
       return this.get('userService').get('users');
    }),
    types:["dimension", "metric"], //TODO: Support property type

    selectedOperator: "matches",
    selectedType: "dimension",
    isOnChanged: observer('selectedType', 'selectedOperator', 'lhsValue', 'value', function() {
        console.log("predicate changed");
        this.set("predicate", this._computeValue());
        console.log(this.get("predicate"));
        this.get("updatePredicate")(this.get("index"), this._computeValue());
    }),

    _computeValue:function(){

        let predicate= {
            type : this.get('selectedType'),
        };


        if(predicate.type === "dimension"){
            predicate.dimension = this.get("lhsValue");
        }
        else if(predicate.type === "metric"){
            predicate.metric = this.get("lhsValue");
        }
        else if(predicate.type === "property"){
            predicate.property = this.get("lhsValue");
        }

        predicate.operator = this.get('selectedOperator');

        predicate.value = this.get('value');

        return predicate;
    },
    actions:{
        delete: function(){
            this.get("deletePredicate")(this.get("index"));
        }
    }

});
