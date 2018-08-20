import Ember from 'ember';
var  computed = Ember.computed;

export default Ember.Controller.extend({
	purecloud: Ember.inject.service(),
	storageService: Ember.inject.service(),
	queueService: Ember.inject.service(),
	org: null,
	name: '',
	phone: '',
	queue: '',
	time: new Date().toTimeString().split(' ')[0],
	date:  new Date().toISOString().split('T')[0],
	callbackCreated: false,

	init(){
		this._super(...arguments);

		let futureTime = new Date();
		futureTime.setHours(futureTime.getHours()+1);
		this.set('time', futureTime.toTimeString().split(' ')[0]);

		let storage = this.get('storageService');
		let savedData = storage.localStorageGet('callbackParams');

		if(savedData){
			this.set('name', savedData.name);
			this.set('queue', savedData.queue);
			this.set('phone', savedData.phone);
		}
	},

	queues: computed('queueService.queues', function() {
		return this.get('queueService').get('queues');
	}),
	actions:{
		createCallback() {
			try{
				this.set('callbackError', null);
				let time =  new Date(this.get('date') + ' ' + this.get('time')).toISOString();
				var data = {
					// name of the individual we are calling back
					callbackUserName: this.get('name'),
					// time at which we will callback the individual
					callbackScheduledTime: time,
					// number(s) to try to call to reach individual
					callbackNumbers: [ this.get('phone') ],
					// queueId of the queue onto which this callback will be placed
					queueId: this.get('queue'),
					// Should use default script if `null`
					scriptId: null
				};

				let self = this;
				let conversationsApi = this.get('purecloud').conversationsApi();
				conversationsApi.postConversationsCallbacks(data).then(function(){
					self.set('callbackCreated', true);

					setTimeout(function(){
						self.set('callbackCreated', false);
					},5000);
				}).catch((error)=>{
					console.log(error);
					self.set('callbackError', error.body ? error.body.message : error);
				});

				let savedData = {
					name: this.get('name'),
					queue: this.get('queue'),
					phone: this.get('phone')
				};

				let storage = this.get('storageService');
				storage.localStorageSet('callbackParams', savedData);
			}catch(ex){
				this.set('callbackError', ex);
			}

		},
		selectQueue(queue) {
			console.log('select queue ' + queue);
			this.set('queue', queue);
		},

	}
});
