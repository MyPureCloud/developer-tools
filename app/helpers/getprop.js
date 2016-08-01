import Ember from 'ember';

const getprop = (params) => params[0][params[1]];
export default Ember.Helper.helper(getprop);
