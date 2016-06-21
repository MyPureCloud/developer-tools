/* global moment */
import Ember from 'ember';
//http://www.programwitherik.com/ember-services-tutorial/
export default Ember.Service.extend({
    socketService: Ember.inject.service('websockets'),
    purecloud: Ember.inject.service(),
    analyticsService: Ember.inject.service(),

    idList: [],
    availableTopics: [],
    websocketMessages: [],
    socketRef: null,
    channelId: null,
    isPinned: false,

    init() {
        this._super(...arguments);

        var api = this.get('purecloud').notificationsApi();

        var that = this;
        api.postChannels().done(function(channel){
            console.log(channel);

            const socket = that.get('socketService').socketFor(channel.connectUri);

            socket.on('open', that.websocketOpenHandler, that);
            socket.on('message', that.websocketMessageHandler, that);

            that.set('socketRef', socket);
            that.set('channelId', channel.id);
        });


        api.getAvailabletopics("description,schema").done(function(topics){
            that.set('availableTopics', topics.entities );
        });

    },
    subscribe(id){
        let versionlessId = id.replace("v2.","");
        this.get("analyticsService").logNotificationRegistration(versionlessId.split(".")[0]);

        var that = this;
        var api = this.get('purecloud').notificationsApi();
        api.postChannelsChannelIdSubscriptions(this.get("channelId"), [{id: id}]).done(function(){
            that.get('idList').pushObject(id);
        }).error(function(error){
            console.log(error);
        });
    },
    unsubscribeAll(){
        var that = this;
        var api = this.get('purecloud').notificationsApi();
        api.putChannelsChannelIdSubscriptions(this.get("channelId"), []).done(function(){
            that.get('idList').clear();
        }).error(function(error){
            console.log(error);
        });
    },

    websocketOpenHandler(event) {
        console.log(`On open event has been called: ${event}`);
    },

    websocketMessageHandler(event) {
        console.log(`Message: ${event.data}`);
        var eventData =  JSON.parse(event.data);

        eventData.bodyString = JSON.stringify(eventData.eventBody);
        eventData.time = moment().format('h:mm:ss.SSS');

        this.get('websocketMessages').pushObject(eventData);

    },
    togglePin(){
        this.toggleProperty('isPinned');
    }
});
