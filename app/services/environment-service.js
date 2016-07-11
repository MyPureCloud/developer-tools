import Ember from 'ember';
import {purecloudEnvironment} from '../utils/purecloud-environment';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

export default Ember.Service.extend({
    purecloudEnvironmentTld(){
        return purecloudEnvironmentTld();
    },
    purecloudEnvironment(){
        return purecloudEnvironment();
    }

});
