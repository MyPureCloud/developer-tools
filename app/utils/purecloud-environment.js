const ENV_REG_EXP = /(inin[dt]ca|[a-zA-Z]*\.mypurecloud\..*|localhost)/i;
import config from '../config/environment';

function purecloudEnvironmentTld(){
    let env = ENV_REG_EXP.exec(window.location.hostname)[1];

    if(env === 'localhost'){
        env = "inindca.com";
    }

    return env;

}

function purecloudEnvironment(){
    return window.location.hostname.replace(".", "");
}

function architectRegion() {
    return config.oauthProps[purecloudEnvironment()].architectEnumString;
}

export{
    architectRegion,
    purecloudEnvironmentTld,
    purecloudEnvironment
};
