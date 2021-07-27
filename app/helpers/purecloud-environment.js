function purecloudEnvironmentTld() {
    let storage = window.localStorage;
    let env = storage.getItem("environment");

    return env;
}

export { purecloudEnvironmentTld };
