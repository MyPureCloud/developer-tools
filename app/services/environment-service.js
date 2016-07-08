import Ember from 'ember';

const ENV_REG_EXP = /(inin[dts]ca|mypurecloud|localhost).*/i;

export default Ember.Service.extend({
    purecloudEnvironmentTld(){
        let env = ENV_REG_EXP.exec(window.location.hostname)[0];

        if(env === 'localhost'){
            env = "inindca.com";
        }

        return env;

    }
});
