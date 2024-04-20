const msg = require('../core/message')
const Codec = require('./codec')

let codec = new Codec()

module.exports = class Prompt extends require('../core/session'){
	constructor(config){
		super()

		this.credentials = config.credentials
		this.address = this.credentials.address
		this.host = config.host
		this.peers = config.peers

		this.connect(this.host)
	}

	onConnected(){
		this.signin(this.credentials)
	}

	reconnect(){
		this.connect(this.host)
	}

	onGranted(data){}
	onDenied(data){}

	onSignal(error, data){
		this.onCommand(error, data)
	}

	onData(error, data){
		this.onCommand(error, data)
	}

	onCommand(data, valid, signal){
		switch(data.subject){
			case '2MAMA' : this.on2MAMA(data); break;

			case 'request' : this.onRequest(data); break;
			case 'access.request' : this.onAccessRequest(data); break;
			case 'library.request': this.onLibraryRequest(data); break;
			case 'notification.request': this.onNotificationRequest(data); break;
			case 'setting.request': this.onSettingRequest(data); break;
			case 'repository.request' : this.onRepositoryRequest(data); break;

			case 'event' : this.onEvent(data); break;			
			case 'access.event' : this.onAccessEvent(data); break;
			case 'library.event': this.onLibraryEvent(data); break;
			case 'notification.event': this.onNotificationEvent(data); break;
			case 'setting.event': this.onSettingEvent(data); break;
			case 'repository.event' : this.onRepositoryEvent(data); break;
        }
    }

	on2MAMA(_){}

	onRequest(_){}
	onAccessRequest(_){}
	onLibraryRequest(_){}
	onNotificationRequest(_){}
	onSettingRequest(_){}
	onRepositoryRequest(_){}
	onAssistantRequest(_){}
	onRecycleRequest(_){}

	onEvent(_){}
	onAccessEvent(_){}
	onLibraryEvent(_){}
	onNotificationEvent(_){}
	onSettingEvent(_){}
	onRepositoryEvent(_){}
	onAssistantEvent(_){}
	onRecycleEvent(_){}

	LA2YA(to){
		this.send('data', msg.create(
			this.address,
			to,
			'LA2YA',
			Date.now() ) )
	}

	response(to, subject, data){
		this.send('data', msg.create(
			this.address,
			to,
			subject + '.response',
			data ) )
	}

	ack(to, subject){
		this.send('data', msg.create(
			this.address,
			to,
			subject + '.ack',
			data ) )
	}

}
