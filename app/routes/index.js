import Ember from 'ember';
import toolsModules from '../utils/dev-tools-modules';

export default Ember.Route.extend({
    model(){
        return toolsModules;
    }
});
