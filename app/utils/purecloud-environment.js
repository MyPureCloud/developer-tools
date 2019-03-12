const ENV_REG_EXP = /(inin[dts]ca|\*\.mypurecloud.*|localhost).*/i;
import config from '../config/environment';

function purecloudEnvironmentTld(){
    let env = ENV_REG_EXP.exec(window.location.hostname)[0];

    if(env === 'localhost'){
        env = "inindca.com";
    }

    return env;

}

function purecloudEnvironment(){
    let env = ENV_REG_EXP.exec(window.location.hostname)[1].replace(/\./g,"");
    return env;
}

function architectRegion() {
  return config.oauthProps[purecloudEnvironment()].architectEnumString;
}

export{
    architectRegion,
    purecloudEnvironmentTld,
    purecloudEnvironment
};
