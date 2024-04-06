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
            case 'pieces': this.onPieces(data); break;
			case 'board': this.onBoard(data); break;
			case 'clock' : this.onClock(data); break;
			case 'theme' : this.onTheme(data); break;
			case 'combo' : this.onCombo(data); break;
			case 'list' : this.onList(data); break;
        }
    }

	onPieces(_){}
	onBoard(_){}
	onClock(_){}
	onTheme(_){}
	onCombo(_){}
	onList(_){}

	pieces(to, data){
		this.send('data', msg.create(
			this.address,
			to,
			'chess.pieces',
			data ) )
	}

	board(to, data){
		this.send('data', msg.create(
			this.address,
			to,
			'chess.board',
			data ) )
	}

	clock(to, data){
		this.send('data', msg.create(
			this.address,
			to,
			'chess.clock',
			data ) )
	}

	theme(to, data){
		this.send('data', msg.create(
			this.address,
			to,
			'chess.theme',
			data ) )
	}

	combo(to, data){
		this.send('data', msg.create(
			this.address,
			to,
			'chess.combo',
			data ) )
	}

	list(to, data){
		this.send('data', msg.create(
			this.address,
			to,
			'chess.list',
			data ) )
	}

}
