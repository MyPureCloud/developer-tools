/*global $*/

import Ember from 'ember';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';

export default Ember.Controller.extend({
    purecloud: Ember.inject.service(),
    swaggerService: Ember.inject.service(),

    init() {
		this._super(...arguments);
        this.loadIntegrations();
        this.get("swaggerService").swagger;
       
    },
    valuesChanged: Ember.observer('swaggerService.swagger', function() {
        this.loadPaths();
    }),

    computedUrl: Ember.computed('selectedUri.parameters.@each.value', function() {
       
        let operation = this.get('selectedUri');
        
        if(typeof operation === "undefined" || operation === null){
            return "";
        }

        let result = operation.uri;

        if(operation.parameters){
            for(let x=0; x< operation.parameters.length; x++){
                let parameter = operation.parameters[x];

                if(parameter.in === "path" && parameter.value && parameter.value !== '' ){
                    result = result.replace(`{${parameter.name}}`, parameter.value);
                }

                if(parameter.in === "query" &&
                    parameter.value !== parameter.default &&
                    parameter.value !== ""){

                    if(result.indexOf('?') === -1){
                        result += "?";
                    }else{
                        result += "&";
                    }

                    result += `${parameter.name}=${encodeURIComponent(parameter.value)}`;
                }
                //result += parameter.name+ "= " + parameter.value + ", "
            }
        }


        return result;
    }),

    loadPaths(){
        let swagger = this.get("swaggerService").get("swagger");

        let paths = [];

        let pathKeys = Object.keys(swagger.paths);

        pathKeys.forEach((key)=>{
            let apis = swagger.paths[key];
           
            let httpMethods = Object.keys(apis);

            httpMethods.forEach((method)=>{
                let api = apis[method];
                api.uri = key;
                api.method = method;
                api.value = api.default

                paths.push(api);
            });
            
        });

        paths.sortBy("uri");

        this.set("uris", paths);        
    },
    loadIntegrations(){
        const apiInstance = this.get('purecloud').integrationsApi();

        let opts = {
            'pageSize': 99,
            'pageNumber': 1
        };

        apiInstance.getIntegrations(opts)
            .then((data) => {
            
            let response = [];

            for (var obj in data.entities) {
                if (data.entities[obj].hasOwnProperty("integrationType") && data.entities[obj].integrationType.id == 'purecloud-data-actions' && data.entities[obj].intendedState == 'ENABLED') {
                    response.push({
                        id: data.entities[obj].id,
                        name: data.entities[obj].name
                    })
                }
            }

            this.set("integrations", response);
        }).catch((err) => {
            console.log('There was a failure calling getIntegrations');
            console.error(err);
            
        });
    }, 
    flatten(target, opts) {
        opts = opts || {}
    
        var delimiter = opts.delimiter || '.'
        var maxDepth = opts.maxDepth
        var output = {}
    
        function step(object, prev, currentDepth) {
            currentDepth = currentDepth || 1
            Object.keys(object).forEach(function (key) {
                var value = object[key]
                var isarray = opts.safe && Array.isArray(value)
                var type = Object.prototype.toString.call(value)
                var isbuffer = isBuffer(value)
                var isobject = (
                    type === '[object Object]' ||
                    type === '[object Array]'
                )
    
                var newKey = prev
                    ? prev + delimiter + key
                    : key
    
                if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
                    (!opts.maxDepth || currentDepth < maxDepth)) {
                    return step(value, newKey, currentDepth + 1)
                }
    
                output[newKey] = value
            })
        }
    
        step(target)
    
        return output
    },
    unflatten (target, opts) {
        opts = opts || {}
     
        var delimiter = opts.delimiter || '.'
        var overwrite = opts.overwrite || false
        var result = {}
     
        var isbuffer = isBuffer(target)
        if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]') {
          return target
        }
     
        // safely ensure that the key is
        // an integer.
        function getkey (key) {
          var parsedKey = Number(key)
     
          return (
            isNaN(parsedKey) ||
            key.indexOf('.') !== -1 ||
            opts.object
          ) ? key
            : parsedKey
        }
     
        var sortedKeys = Object.keys(target).sort(function (keyA, keyB) {
          return keyA.length - keyB.length
        })
     
        sortedKeys.forEach(function (key) {
          var split = key.split(delimiter)
          var key1 = getkey(split.shift())
          var key2 = getkey(split[0])
          var recipient = result
     
          while (key2 !== undefined) {
            var type = Object.prototype.toString.call(recipient[key1])
            var isobject = (
              type === '[object Object]' ||
              type === '[object Array]'
            )
     
            // do not write over falsey, non-undefined values if overwrite is false
            if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
              return
            }
     
            if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
              recipient[key1] = (
                typeof key2 === 'number' &&
                !opts.object ? [] : {}
              )
            }
     
            recipient = recipient[key1]
            if (split.length > 0) {
              key1 = getkey(split.shift())
              key2 = getkey(split[0])
            }
          }
     
          // unflatten again for 'messy objects'
          recipient[key1] = unflatten(target[key], opts)
        })
     
        return result
    },
     
    getUri(){    
        let environment = purecloudEnvironmentTld();

        let url = `https://api.${environment}` + this.get("computedUrl");
        return url;
    },
    actions:{
        executeRequest(){
            let purecloud = this.get('purecloud');
            let operation = this.get('selectedUri');
           
            let url = this.getUri();
            let requestParams = {
                method: operation.method,
                url: url,
                timeout: 5000,
                headers:{
                    "Authorization": "bearer " +  purecloud.get('accessToken'),
                    "content-type": "application/json",
                }
            };

            $.ajax(requestParams).then(( data, textStatus, jqXHR  ) => {
                this.set("result",JSON.stringify(data, null,  '  '));

            }).catch(function(jqXHR){
                // that.set("hasResponse", true);
                // that.set("hideRequest", true);
                // that.set("response", handleResponse(jqXHR));
            });


        },
        createAction(){
            let operation = this.get('selectedUri');
            let uri = this.getUri();

            let requestTemplate = "";

            // Build inputContract
            var inputContract = {};
            operation.parameters.forEach((param)=>{
                if (param.in === 'body'){
                    let flat = flatten(param.value);
                    for (var key in flat) {
                        let parameterName = key.replace(/[.]/g, '_');
                        parameters.push(parameterName);
                        flat[key] = `\${input.${parameterName}}`
                    }
                    
                    requestTemplate = JSON.stringify(this.unflatten(flat));
                }else{
                    inputCotract[param.name] = {
                        type: 'string',
                        title: param.name
                    }
                }
            });

            

            // // Build outputContract
            var outputContract = {};
            var outputTranslationMap = {};
            var outputSuccessTemplate = "{ ";
 
            // for (var j = 0; j < _input.outputParameters.length; j++) {
            //     let item = _input.outputParameters[j];
            //     outputContract[item.name] = {
            //         type: item.type.toLowerCase(),
            //         title: item.name.toLowerCase()
            //     };
            //     outputTranslationMap[item.name.toLowerCase()] = item.path;
            //     outputSuccessTemplate = outputSuccessTemplate + " \"" + item.name.toLowerCase() + "\": ${" + item.name.toLowerCase() + "} ,";
            // }


            // remove last character & close bracket
            outputSuccessTemplate = outputSuccessTemplate.substring(0, outputSuccessTemplate.length - 1) + "}";
            console.log(`outputSuccessTemplate: ${outputSuccessTemplate}`);
 
 
            // response successTemplate
 
            // Create DataActionBody
            let dataActionBody = {
                category: "PureCloud Data Actions",
                name: this.get("name"),
                integrationId: this.get("selectedIntegration").id,
                contract: {
                    input: {
                        inputSchema: {
                            $schema: "http://json-schema.org/draft-04/schema#",
                            title: "Input parameters",
                            description: "Input parameters",
                            type: "object",
                            properties: inputContract
                        }
                    },
                    output: {
                        successSchema: {
                            $schema: "http://json-schema.org/draft-04/schema#",
                            title: "Response",
                            description: "Response",
                            type: "object",
                            properties: outputContract
                        }
                    }
                },
                config: {
                    request: {
                        requestUrlTemplate: this.getUri(),
                        requestTemplate: requestTemplate,
                        requestType: operation.method,
                        headers: {
                            UserAgent: "PureCloudIntegrations/1.0",
                            'Content-Type': "application/json"
                        }
                    },
                    response: {
                       translationMap: outputTranslationMap,
                        translationMapDefaults: {},
                        successTemplate: outputSuccessTemplate
                    }
                },
                secure: this.get("secure")
           }
            console.log(JSON.stringify(dataActionBody));
 
            // // Create DataAction
            // const apiInstance = this.get('purecloud').integrationsApi();


            // if (this.get("publish")) {
            //     apiInstance.postIntegrationsActions(dataActionBody)
            //         .then((data) => {
            //         console.log(`postIntegrationsActionsDrafts success! data: ${JSON.stringify(data, null, 2)}`);
            //         console.log(`dataAtionId: ${data.id}`);
            //         resolve(data.id)
            //         // https://apps.mypurecloud.ie/directory/#/admin/integrations/actions/custom_-_da879bdb-25cc-4dd5-ae4c-a64a3aeabd1e/setup/test
            //     })
            //         .catch((err) => {
            //         console.log('There was a failure calling postIntegrationsActionsDrafts');
            //         console.error(err);
            //         reject()
            //     });
            // } else {
            //     apiInstance.postIntegrationsActionsDrafts(dataActionBody)
            //         .then((data) => {
            //         console.log(`postIntegrationsActionsDrafts success! data: ${JSON.stringify(data, null, 2)}`);
            //         console.log(`dataAtionId: ${data.id}`);
            //         resolve(data.id)
            //         // https://apps.mypurecloud.ie/directory/#/admin/integrations/actions/custom_-_da879bdb-25cc-4dd5-ae4c-a64a3aeabd1e/setup/test
            //     })
            //         .catch((err) => {
            //         console.log('There was a failure calling postIntegrationsActionsDrafts');
            //         console.error(err);
            //         reject()
            //     });
            // }
            

            
        }
    }

});