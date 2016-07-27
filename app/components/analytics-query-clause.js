import Ember from 'ember';
var observer = Ember.observer;

export default Ember.Component.extend({
    types:["and", "or"],
    selectedType: "or",
    predicates: [],
    init: function(){
        this._super(...arguments);

        let clause = this.get("clause");
        if(clause){
            this.set("selectedType", clause.type);
            this.set("predicates", clause.predicates);
        }
    },
    isOnChanged: observer('selectedType', 'predicates.@each', function() {
        this.set("clause", this._computeValue());
        this.get("updateClause")(this.get("index"), this._computeValue());
    }),

    _computeValue:function(){

        let clause= {
            type : this.get('selectedType'),
            predicates : this.get("predicates")
        };

        return clause;
    },
    actions:{
        newPredicate: function(){
            this.predicates.addObject({
                "type": "dimension",
                "predicates": []
               });
        },
        updatePredicate: function(index,predicate){
            this.predicates[index] = predicate;
            this.get("updateClause")(this.get("index"), this._computeValue());
        },
        deletePredicate:function(index){
            this.predicates.removeAt(index);
        },
        delete: function(){
            this.get("deleteClause")(this.get("index"));
        }
    }

});
