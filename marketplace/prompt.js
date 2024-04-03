const msg = require('./core/message')
const Codec = require('./codec')

let codec = new Codec()

module.exports = class Prompt extends require('./core/session'){
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
			case 'add': this.onAdd(data); break;
			case 'remove' : this.onRemove(data); break;
			case 'update': this.onUpdate(data); break;
			case 'list': this.onList(data); break;

			case 'add-interface': this.onAddInterface(data); break;
			case 'remove-interface' : this.onRemoveInterface(data); break;
			case 'update-interface': this.onUpdateInterface(data); break;

        }
    }

	onAdd(_){}
	onRemove(_){}
	onUpdate(_){}
	onList(_){}

	onAddInterface(_){}
	onRemoveInterface(_){}
	onUpdateInterface(_){}

	list(to, data){
		this.send('data', msg.create(
			this.address,
			to,
			'marketplace.list',
			data ) )
	}

	notify(to, subject, data){
		this.send('data', msg.create(
			this.address,
			to,
			`marketplace.${subject}`,
			data ) )
	}


	example(to, data){
		this.send('data', msg.create(
			this.address,
			to,
			'example',
			data ) )
	}

}
