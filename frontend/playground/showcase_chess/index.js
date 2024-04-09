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

	onMove(e){
		console.log('on move', e.detail)
	}

	onPaste(e){
		console.log('on paste', e.detail)
	}

	onInvite(e){
		console.log('on invite', e.detail)
	}

	onRole(e){
		console.log('on role', e.detail)
	}
}

class Session{
	constructor(socket, id){
		this.socket = socket
		this.id = id	

		this.socket.on('move', data => this.handleEvent('move', data))
		this.socket.on('invite', data => this.handleEvent('invite', data))
		this.socket.on('role', data => this.handleEvent('role', data))
		this.socket.on('paste', data => this.handleEvent('paste', data))

		this.notify('init', { session: {id}})
	}

	handleEvent(id, e){
		console.log(id, e)
		if (desk.getSession(e.peer))
			desk.notify(e.peer, id, {from: this.id, data: e.data})
		else{
			prompt.notify(id, {from: this.id, to: e.peer, data: e.data})
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
