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
		this.socket.on('request', data => this.handleRequest(data))

		this.notify('init', { session: {id}, users: desk.users})
	}

	handleEvent(e){
		let {id, data} = e
		console.log(id, data)
		switch(id){
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

		this.users = [
			{
				id: '3000',
				badge: 'Guest',
				role: 'Guest'
			},
			{
				id: '1000',
				badge: 'Lola Marta',
				role: 'Administrator'
			},
			{
				id: '1001',
				badge: 'Papo Lucas',
				role: 'Developer'
			},
			{
				id: '1002',
				badge: 'Petro Marcelo',
				role: 'System Architect'
			},
			{
				id: '1003',
				badge: 'Armando Postre',
				role: 'Hotel Chain Advisor'
			}
		]
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
