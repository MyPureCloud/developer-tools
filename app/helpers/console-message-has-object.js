import Ember from 'ember';

export function consoleMessageHasObject(params) {

    const message = params[0];

    var hasObject = false;

    if(message == null){
        return false;
    }

    for(let x=0; x< message.messageParams.length; x++){
        let param = message.messageParams[x];
        if(param.isObject){
            hasObject = true;
        }
    }

    return hasObject;
}

export default Ember.Helper.helper(consoleMessageHasObject);
