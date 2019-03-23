import Ember from 'ember'
var computed = Ember.computed
import { purecloudEnvironmentTld } from '../utils/purecloud-environment'

export default Ember.Controller.extend({
  purecloud: Ember.inject.service('purecloud'),
  isStandalone: computed(function() {
    return this.get('purecloud.isStandalone')
  })
})
