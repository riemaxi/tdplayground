const http = require('http')
const socket = require('socket.io')

class Desk{
	constructor(config){
		let server = http.createServer()

		this.dispatch(socket(server, {cors: true}))

		server.listen(config.port, () => this.onListening())
	}

	dispatch(io){
		io.on('connection', socket => {
			let session = this.createSession(socket)
			socket.on('disconnect', () => this.onCloseSession(session))
		})
	}

	onListening(){}

	onCloseSession(_){}
	createSession(_){}

}

module.exports = Desk
