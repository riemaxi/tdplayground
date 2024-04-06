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

	onResponse(data){
		let {request, response} = data.detail

		console.log('response', 'to', request.detail.to)
		desk.notify(request.detail.to, 'response', response)
	}
}

class Session{
	constructor(socket, id){
		this.socket = socket
		this.id = id

		console.log('open', id)

		this.socket.on('x', data => prompt.request({to: id, type: 'railroad'}))
		//this.socket.on('x', data => prompt.request({to: id, ...data}))

		this.notify('init', {id})
	}

	notify(id, data){
		this.socket.emit(id, data)
	}

	close(){
		console.log('closed', this.id)
	}
}

let desk = new class extends require('../../core/ns.desk'){
	constructor(){
		super(config.desk)
		this.sessions = {}
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
