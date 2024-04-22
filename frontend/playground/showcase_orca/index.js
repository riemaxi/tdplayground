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

		this.request('access.request', { id: 'list' })		
	}

	onEvent(e){
		let {to, id, data} = e.detail
		console.log('on event', e.detail)
		desk.notify(to, id, data)
	}

	onAccessResponse(e){
		let {id, detail} = e.detail
		console.log(id, detail)
		switch(id){
			case 'grant' : desk.notify(detail.to, 'granted', detail); break;
			case 'list' : desk.users = detail; break;
		}
	}
}

class Session{
	constructor(socket, id){
		this.socket = socket
		this.id = id	

		this.socket.on('event', data => this.handleEvent(data))
		this.socket.on('request', data => this.handleRequest(data))

		this.notify('init', { session: {id}, users: desk.users})
	}

	handleEvent(e){
		let {id, data} = e
		console.log(id, data)
		switch(id){
			case 'session.command' : prompt.request('access.request', data); break;
			case 'sp.command' : prompt.request('request', data); break;
			case 'canvas.command': prompt.request('repository.request', data); break;
		}
	}

	handleRequest(e){
		let {id, data} = e
		console.log(id, data)
		prompt.request(id, data)
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

		this.users = []
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
