
const Codec = require('./codec')

let codec = new Codec()

module.exports = class System extends require('./tdpnet').Session{
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
			case 'request' : this.onRequest(data); break;
			case 'response' : this.onResponse(data); break;
        }
    }

	onRequest(_){}
	onResponse(_){}

	request(to, detail){
		this.send('data', this.message(
			this.address,
			to,
			'request',
			detail ) )
	}
}