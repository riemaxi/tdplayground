const msg = require('./core/message')
const Codec = require('./codec')

let codec = new Codec()

module.exports = class Prompt extends require('./core/session'){
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
            case 'create': this.onCreate(data); break;
			case 'reset': this.onReset(data); break;
			case 'update' : this.onUpdate(data); break;
			case 'remove' : this.onRemove(data); break;
        }
    }

	onCreate(_){}
	onReset(_){}
	onUpdate(_){}
	onRemove(_){}
	onState(_){}

	notify(subject, data){
		this.send('data', msg.create(
			this.address,
			this.peers.hub,
			'chess.' + subject,
			data ) )
	}

	state(to,  data){
		this.send('data', msg.create(
			this.address,
			to,
			'chess.state',
			data ) )

	}
	
}
