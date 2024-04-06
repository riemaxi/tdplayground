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

	onList(data){
		let {to, list} = data.detail
		console.log('on list', to)
		desk.notify(to, 'list', list)
	}
}

class Session{
	constructor(socket, id){
		this.socket = socket
		this.id = id

		console.log('open', id)

		this.socket.on('list', data => prompt.list({to: id, ...data}))

		this.notify('init', {id})
	}

	notify(id, data){
		this.socket.emit(id, data)
	}

	close(){
		console.log('closed', this.id)
	}
}

let desk = new class extends require('../core/ns.desk'){
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
