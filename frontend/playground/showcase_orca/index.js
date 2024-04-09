const config = require('./config')

let prompt = new class extends require('./prompt'){
	constructor(){
		super(config.prompt)
	}

	onDenied(data){
		console.log('denied as', this.address)
	}

	onGranted(data){
		console.log('granted as', this.address)
	}

	onEvent(e){
		let {to, id, data} = e.detail
		console.log('on event', e.detail)
		desk.notify(to, id, data)
	}
}

class Session{
	constructor(socket, id){
		this.socket = socket
		this.id = id	

		this.socket.on('event', data => this.handleEvent(data))

		this.notify('init', { session: {id}})
	}

	handleEvent(e){
		let {to, id, data} = e
		console.log(id, to)
		if (desk.getSession(to))
			desk.notify(to, id, data)
		else{
			prompt.notify(id, {from: this.id, to, data})
		}
	}

	notify(id, data){
		console.log('notify', id, data)
		this.socket.emit(id, data)
	}

	close(){
	}
}

let desk = new class extends require('../../core/ns.desk'){
	constructor(){
		super(config.desk)
		this.sessions = {}
	}

	getSession(id){
		return this.sessions[id]
	}

	notify(to, id, data){
		let session = this.sessions[to]
		session?.notify(id, data)
	}

	onListening(port){
		console.log('on', port)
	}

	createSession(socket, id){
		return this.sessions[id] = new Session(socket, id)
	}

	onCloseSession(session, id){
		session.close()

		delete this.sessions[id]
	}
}
