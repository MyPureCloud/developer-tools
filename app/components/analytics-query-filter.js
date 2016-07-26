import Ember from 'ember';

var observer = Ember.observer;

export default Ember.Component.extend({
    types:["and", "or"],
    selectedType: "",
    clauses:[],
    predicates: [],
    init: function(){
        let self = this;
        this._super(...arguments);
        this.set("selectedType", "or");

        //not sure if there is a better way to do this, need to set the filter value, if i do it here in the init
        //the parent component looking at this property doesn't see the value change
        setTimeout(function(){
            let query = self._computeValue();
            self.set("filter", query);
        },200);

    },
    _computeValue:function(){
        let query={
            type:this.get('selectedType')
        };

        if(this.clauses.length > 0){
            query["clauses"] = this.clauses;
        }

        if(this.predicates.length > 0){
            query["predicates"] = this.get("predicates");
        }

        if(query.predicates || query.clauses){
            return query;
        }

        return null;
    },
    valuesChanged: observer('selectedType', 'clauses.@each','predicates.@each', function() {
        console.log("filter values changed");
        this.set("filter", this._computeValue());
    }),
    actions:{
        newPredicate: function(){
            this.predicates.addObject({
                "type": "dimension",
                "operator": "matches"
               });
        },
        updatePredicate: function(index,predicate){
            this.predicates[index] = predicate;
            this.set("filter", this._computeValue());
        },
        deletePredicate:function(index){
            this.predicates.removeAt(index);
            this.set("filter", this._computeValue());
        },
        newClause: function(){
            this.clauses.addObject({
                "type": "or",
                "predicates": []
               });
        },
        updateClause: function(index,clause){
            this.clauses[index] = clause;
            this.set("filter", this._computeValue());
        },
        deleteClause:function(index){
            this.clauses.removeAt(index);
            this.set("filter", this._computeValue());
        },

    }

});
