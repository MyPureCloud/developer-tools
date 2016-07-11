const ENV_REG_EXP = /(inin[dts]ca|mypurecloud|localhost).*/i;

function purecloudEnvironmentTld(){
    let env = ENV_REG_EXP.exec(window.location.hostname)[0];

    if(env === 'localhost'){
        env = "inindca.com";
    }

    return env;

}

function purecloudEnvironment(){
    let env = ENV_REG_EXP.exec(window.location.hostname)[1];

    return env;
}

export{
    purecloudEnvironmentTld,
    purecloudEnvironment
};
