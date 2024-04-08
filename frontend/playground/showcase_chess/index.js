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

	handleEvent(id, data){
		console.log(id, {to: this.id, data})
		
		if (desk.getSession(data.peer))
			desk.notify(data.peer, id, {to: this.id, data})
		else{
			prompt.notify(id, {to: this.id, data})
		}
	}

	notify(id, data){
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
