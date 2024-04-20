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

			case 'access.request' : this.onAccessRequest(data); break;
			case 'library.request': this.onLibraryRequest(data); break;
			case 'notification.request': this.onNotificationRequest(data); break;
			case 'setting.request': this.onSettingRequest(data); break;
			case 'repository.request' : this.onRepositoryRequest(data); break;
        }
    }

	on2MAMA(_){}

	onAccessRequest(_){}
	onLibraryRequest(_){}
	onNotificationRequest(_){}
	onSettingRequest(_){}
	onRepositoryRequest(_){}
	onAssistantRequest(_){}
	onRecycleRequest(_){}

	LA2YA(to){
		this.send('data', msg.create(
			this.address,
			to,
			'LA2YA',
			Date.now() ) )
	}

	response(subject, data){
		this.send('data', msg.create(
			this.address,
			this.peers.hub,
			subject + '.response',
			data ) )
	}

}
