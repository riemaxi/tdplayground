const msg = require('../../core/message')
const Codec = require('./codec')

let codec = new Codec()

module.exports = class Prompt extends require('../../core/session'){
	constructor(config){
		super()

		this.credentials = config.credentials
		this.address = this.credentials.address
		this.host = config.host
		this.greeting = config.greeting
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
			case 'move': this.onMove(data); break;
			case 'invite': this.onInvite(data); break;
			case 'paste': this.onPaste(data); break;
			case 'role': this.onRole(data); break;
        }
    }

	onMove(_){}
	onPaste(_){}
	onInvite(_){}
	onRole(_){}

	notify(subject, detail){
		this.send('data', msg.create(
			this.address,
			this.peers.hub,
			subject,
			detail ) )
	}
}

