/* global $ */
/* global ININ */
import Ember from 'ember';
import Chance from 'npm:chance';
import {purecloudEnvironmentTld} from '../utils/purecloud-environment';
import config from '../config/environment';

var  computed = Ember.computed;

export default Ember.Controller.extend({
    purecloud: Ember.inject.service(),
    storageService: Ember.inject.service(),
    queueService: Ember.inject.service(),
    org: null,
    firstName: "",
    lastName: "",
    address: "",
    city:"",
    state: "",
    zip: "",
    phone: "",
    queue: "",
    locale: "en",
    init(){
        this._super(...arguments);

        let orgApi = this.get("purecloud").orgApi();

        orgApi.getMe().then(result => {
            this.set("org",result);

            let storage = this.get("storageService");
            let savedData = storage.localStorageGet("webChatParams");

            if(savedData){
                this.set("firstName", savedData.firstName);
                this.set("lastName", savedData.lastName);
                this.set("address", savedData.address);
                this.set("city", savedData.city);
                this.set("state", savedData.state);
                this.set("zip", savedData.zip);
                this.set("phone", savedData.phone);
                this.set("queue", savedData.queue);
                this.set("locale", savedData.locale);
            }
        });



    },
    queues: computed('queueService.queues', function() {
        return this.get('queueService').get('queues');
    }),
    chatConfig: computed('queue', 'firstName', 'lastName', 'address', 'city', 'zip', 'state', 'phone', 'locale', function() {
        try{
            let environment = purecloudEnvironmentTld();
            let companyLogo = $("#companyLogo").attr('src');
            let companyLogoSmall = $("#companyLogoSmall").attr('src');
            let agentAvatar = $("#agentAvatar").attr('src');

            let resourcePrefix = window.location.origin;
            if(config.APP.urlprefix){
                resourcePrefix = config.APP.urlprefix;
            }

            if(typeof companyLogo !== 'undefined' && companyLogo[0] !== "h"){
                companyLogo = resourcePrefix + companyLogo;
                companyLogoSmall = resourcePrefix + companyLogoSmall;
                agentAvatar = resourcePrefix + agentAvatar;
            }

            let org = this.get("org");
            if(org === null){
                return "{}";
            }

            let chatConfig = {
                // Web chat application URL
                "webchatAppUrl": "https://apps."+ environment +"/webchat",

                // Web chat service URL
                "webchatServiceUrl": "https://realtime."+ environment +":443",

                "orgId": this.get("org").thirdPartyOrgId,

                // Organization name
                "orgName": this.get("org").thirdPartyOrgName,


                "queueName": this.get("queue"),

                // Log level
                "logLevel": "DEBUG",

                // Locale code
                "locale": this.get("locale"),

                // Data that will be included with interaction
                "data": {
                    "firstName": this.get("firstName"),
                    "lastName": this.get("lastName"),
                    "addressStreet":  this.get("address"),
                    "addressCity":  this.get("city"),
                    "addressPostalCode":  this.get("zip"),
                    "addressState":  this.get("state"),
                    "phoneNumber":  this.get("phone"),
                },

                // Logo used at the top of the chat window
                "companyLogo": {
                    "width": 600,
                    "height": 149,
                    "url": companyLogo
                },

                // Logo used within the chat window
                "companyLogoSmall": {
                    "width": 25,
                    "height": 25,
                    "url": companyLogoSmall
                },

                // Image used for agent
                "agentAvatar": {
                    "width": 462,
                    "height": 462,
                    "url": agentAvatar
                },

                // Text displayed with chat window is displayed
                "welcomeMessage": "Thanks for chatting using the dev tools chat page.",

                // CSS class applied to the chat window
                "cssClass": "webchat-frame",

                // Custom style applied to the chat window
                "css": {
                    "width": "100%",
                    "height": "100%"
                }
            };

            return JSON.stringify(chatConfig, null, "  ");
        }catch(ex){
            console.error(ex);
        }
        return "{}";
    }),
    actions:{
        startChat() {
            let chatConfig = JSON.parse(this.get("chatConfig"));

            ININ.webchat.create(chatConfig, function(err, webchat) {
                if (err) {
                    console.error(err);
                    throw err;
                }

                webchat.renderPopup({
                    width: 400,
                    height: 400,
                    title: 'Chat'
                });
            });

            let savedData = {
                firstName: this.get("firstName"),
                lastName: this.get("lastName"),
                address: this.get("address"),
                city: this.get("city"),
                state: this.get("state"),
                zip: this.get("zip"),
                phone: this.get("phone"),
                queue: this.get("queue"),
                locale: this.get("locale")
            };

            let storage = this.get("storageService");
            storage.localStorageSet("webChatParams", savedData);
        },
        populate() {
            var chance = new Chance();

            this.set("firstName", chance.first());
            this.set("lastName", chance.last());
            this.set("address", chance.address());
            this.set("city", chance.city());
            this.set("state", chance.state());
            this.set("zip", chance.zip());
            this.set("phone", chance.phone());
            this.set("locale", "en");
        }
    }
});
