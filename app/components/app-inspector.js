/*global moment*/
import Ember from 'ember';

export default Ember.Component.extend({
    lastNumberOfDays: 7,
    purecloud: Ember.inject.service('purecloud'),
    swaggerService: Ember.inject.service(),
    extraDefinedScopes: [],
    scopesThatCanBeDowngraded: [],
    resources: null,
    orgCount: 0,
    userCount: 0,
    init() {
        this._super(...arguments);
        this.get("purecloud").oauthApi().getOauthClients().then((data)=> {
            data.entities.push({});
            this.set("clients", data.entities.sortBy("name"));
        });
        this.get("swaggerService").swagger;
    },

    clientChangedGetOrgUsage: Ember.observer('clientId', function() {
        let clientId = this.get("clientId");
        this.queryAndGetResults(clientId, ["organizationId"]).then((results) => {
            this.set("orgCount", results.results.length);
        });
        
    }),

    clientChangedGetUserUsage: Ember.observer('clientId', function() {
        let clientId = this.get("clientId");
        this.queryAndGetResults(clientId, ["userId"]).then((results) => {
            this.set("userCount", results.results.length);           
        });
    }),

    valuesChanged: Ember.observer('clientId', function() {

        let clientId = this.get("clientId");
  
        let client = this.clients.findBy("id", clientId);
        this.set("client", client);
            
        this.set("resources", null);
        this.set("noresults", false);
  
        this.queryAndGetResults(clientId, ["userId"]).then((results) => {
            console.log("userCount count " + results.results.length());
            this.set("userCount", results.results.length());
        });

        this.queryAndGetResults(clientId, ["templateuri","httpmethod"]).then((results) => {

            let requiredPermissions  = [];
            let requiredScopes  = [];
            let resources = [];

            if(results.results){
                results.results.forEach((method) => {
                    if (method.status200 > 0){
                        let uri = method.templateUri;
                        if(uri[0] !== '/'){
                            uri = '/' + uri;
                        }

                        let scope = this.getScopeForResource(uri, method.httpMethod);

                        if(scope && requiredScopes.indexOf(scope) === -1){
                            if(scope.indexOf("readonly") > -1){
                                //found readonly scope, check if there is a readwrite scope already defined
                                let rwScope = scope.split(':')[0]
                                if (requiredScopes.indexOf(rwScope) === -1){
                                    requiredScopes.push(scope);
                                }

                            }else{
                                //found readwrite scope, remove any readonly scopes
                                requiredScopes.push(scope);
                                requiredScopes.removeObject(scope + ":readonly");                                    
                            }
                        }

                        let permissions = this.getPermissionsForResource(uri, method.httpMethod);
                        if(permissions && requiredPermissions.indexOf(permissions) === -1){
                            requiredPermissions.push(permissions);
                        }

                        resources.push({
                            templateUri: uri,
                            method: method.httpMethod,
                            scope,
                            permissions

                        });
                    }
                    
                });
            }
            
            this.set("noresults", !resources || resources.length === 0)
            this.set("requiredScopes",requiredScopes.sort());
            this.set("requiredPermissions",requiredPermissions.sort());
            this.set("resources", resources.sortBy("templateUri"));

            let definedScopes = client.scope;
            let scopesThatCanBeDowngraded = [];

            requiredScopes.forEach((reqScope) =>{
                definedScopes.removeObject(reqScope);

                if(reqScope.indexOf("readonly") > -1){
                    let rwScope = reqScope.split(":")[0];
                    if(definedScopes.indexOf(rwScope) > -1){
                        scopesThatCanBeDowngraded.push(rwScope);
                        definedScopes.removeObject(rwScope);
                    }
                }
            });

            this.scopesThatCanBeDowngraded.setObjects(scopesThatCanBeDowngraded.sort());
            this.extraDefinedScopes.setObjects(definedScopes.sort());
            
        });
    }),
    getScopeForResource(templateUri, httpMethod){
        let swagger = this.get("swaggerService").get("swagger");

        let uriDef = swagger.paths[templateUri];
        let scope = null;

        if (uriDef){
            let def = uriDef[httpMethod.toLowerCase()];
            if (def){
                if(def.security && def.security.length > 0){
                    def.security.forEach((security) => {
                        if(security['PureCloud OAuth']){
                            let readonlyScopes = security['PureCloud OAuth'].filter((scope) => scope.indexOf(":readonly") > 0);
                            let writeScopes = security['PureCloud OAuth'].filter((scope) => scope.indexOf(":readonly") == -1);

                            if (readonlyScopes.length > 0){
                                scope = readonlyScopes[0]
                            } else if (writeScopes.length > 0){
                                scope = writeScopes[0];
                            }
                        }
                    });
                }
            }
        }
        
        return scope;

    },
    getPermissionsForResource(templateUri, httpMethod){
        let swagger = this.get("swaggerService").get("swagger");
        
        let uriDef = swagger.paths[templateUri];
        if (uriDef){
            let def = uriDef[httpMethod.toLowerCase()];
            if (def){
                if(def['x-inin-requires-permissions'] && def['x-inin-requires-permissions'].permissions.length > 0){
                    let permissionType = def['x-inin-requires-permissions'].type;
                    return `${permissionType} ${def['x-inin-requires-permissions'].permissions.join(",")}`                    
                }
            }
        }
        
        return null;
    },
 
    // queryUsage(client){
    //     let purecloud = this.get("purecloud");
        
    //     let startDate = moment().startOf("day").add(-1 * this.get("lastNumberOfDays"), 'days');
    //     let endDate = moment().startOf("day");
        
    //     let query = {
    //         "interval": startDate.toISOString() + '/' + endDate.toISOString(),
    //         "groupBy":["templateuri","httpmethod"]
    //     }

    //     return purecloud.post( `/api/v2/oauth/clients/${client.id}/usage/query`, query);
    // },
    queryAndGetResults(clientId, groupByList){
        let purecloud = this.get("purecloud");
        
        let startDate = moment().startOf("day").add(-1 * this.get("lastNumberOfDays"), 'days');
        let endDate = moment().startOf("day");

        let query = {
            "interval": startDate.toISOString() + '/' + endDate.toISOString(),
            "groupBy":groupByList
        };

        return new Promise((resolve) => {
            purecloud.post( `/api/v2/oauth/clients/${clientId}/usage/query`, query).then((usageExecution)=>{
                let executionId = usageExecution.executionId;

                //Retry until you get a good response
                let interval = setInterval(() =>{
                
                    this.queryUsageResult(clientId, executionId).then((results)=>{
                        if(results.queryStatus.toLowerCase() === "running"){
                            return;
                        }

                        clearInterval(interval);

                        resolve(results);

                    }).catch(()=>{
                        clearInterval(interval);
                    });
                }, 3000);
            });
        });
        
    },
    queryUsageResult(clientId, executionId){
        let purecloud = this.get("purecloud");

        return purecloud.get( `/api/v2/oauth/clients/${clientId}/usage/query/results/${executionId}`);
    }
});
