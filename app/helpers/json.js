
import Ember from 'ember';

const json = (params) =>  JSON.stringify(params[0], null, " ");

export default Ember.Helper.helper(json);
