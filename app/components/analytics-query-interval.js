/* global moment */
import Ember from 'ember';
var  observer = Ember.observer;

export default Ember.Component.extend({
  startDate: moment().subtract(7, 'days'),
  endDate: moment(),
  noInterval: false,
  init(){
      this._super(...arguments);
      this.get("startDate");
      this.set("endDate", moment());

      this.get("noInterval");

      let self = this;
      setTimeout(function(){
          if ( !(self.get('isDestroyed') || self.get('isDestroying')) ) {
              self._computeValue();
          }
      },100);

  },
  _computeValue(){
      let start = this.get("startDate");
      let end = this.get("endDate");

      let noInterval = this.get("noInterval");
      let value = "";
      if(noInterval){
          value = null;
      }else if(start && end){
          value = start.toISOString() + '/' + end.toISOString();
      }else {
          value = "";
      }

      this.set("value", value);
  },
  valuesChanged: observer('startDate', 'endDate', 'noInterval', function() {
      this._computeValue();
  })

});
