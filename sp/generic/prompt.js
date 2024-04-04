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
			//SP Publisher
			case 'publisher.added' : this.onAdded(data); break;
			case 'publisher.updated' : this.onUpdated(data); break;
			case 'publisher.removed' : this.onRemoved(data); break;
			case 'publisher.list' : this.onList(data); break;

			//SP
            case 'req': this.onRequest(data); break;
            case 'res': this.onResponse(data); break;
            case 'trn': this.onTransition(data); break;
            case 'ack': this.onTransitionAck(data); break;
            case 'stm': this.onStream(data); break;
        }
    }

	//SP Publisher
	onAdded(_){}
	onRemoved(_){}
	onUpdated(_){}
	onList(_){}

	//SP
	onRequest(_){}
	onResponse(_){}
	onTransition(_){}
	onTransitionAck(_){}
	onStream(_){}


	//SP publisher
	addSP(data){
		this.send('data', msg.create(
			this.address,
			this.peers.publisher,
			'add',
			data ) )
	}

	removeSP(data){
		this.send('data', msg.create(
			this.address,
			this.peers.publisher,
			'remove',
			data ) )
	}

	updateSP(data){
		this.send('data', msg.create(
			this.address,
			this.peers.publisher,
			'update',
			data ) )
	}

	listSP(data){
		this.send('data', msg.create(
			this.address,
			this.peers.publisher,
			'list',
			data ) )
	}

	//Basic SP
	request(data){
		this.send('data', msg.create(
			this.address,
			this.peers.hub,
			'req',
			data ) )
	}

	response(data){
		this.send('data', msg.create(
			this.address,
			this.peers.hub,
			'res',
			data ) )
	}

	transition(data){
		this.send('data', msg.create(
			this.address,
			this.peers.hub,
			'trn',
			data ) )
	}

	transitionAck(data){
		this.send('data', msg.create(
			this.address,
			this.peers.hub,
			'ack',
			data ) )
	}

	stream(data){
		this.send('data', msg.create(
			this.address,
			this.peers.hub,
			'stm',
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
