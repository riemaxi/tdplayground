const {Manager} = require('socket.io-client')

class Session{
	constructor(){
	}

	connect(host){
		let manager = new Manager(host)
		this.socket = manager.socket('/')
		this.socket.io.on('error', data => this.onError(data))
		this.socket.on('connect', () => this.onConnected(Date.now()))
		this.socket.on('granted', data => this.onGranted(data))
		this.socket.on('denied', data => this.onDenied(data))
		this.socket.on('data', data => this.onData(data, this.valid(data)))
		this.socket.on('signal', data => this.onSignal(data, this.valid(data)))
	}

	onError(_){}
	onConnected(_){}
	onGranted(_){}
	onDenied(_){}
	onData(data, valid){ this.onCommand(data, valid, false)}
	onSignal(data, valid){ this.onCommand(data, valid, true)}
	onCommand(data,valid, signal){}

	valid(data){
		return data.from != undefined
	}

	send(id, data){
		this.socket.emit(id, data)
	}

	signin(data){
		this.send('signin', data)
	}

	signoff(data){
		this.send('signoff', data)
	}

    message(from, to, subject, detail){
        return {
            timestamp: Date.now(),
            from,
            to,
            subject,
            detail
        }
    }
    
}

const http = require('http')
const xpr = require('express')
const socket = require('socket.io')
const {v4 : uuid} = require('uuid')

class Desk{
	constructor(config){
		this.server = xpr()
		this.server.use(xpr.static(config.home))

		this.listen(config.port)
	}

	listen(port){
		let app = http.createServer(this.server)

		this.dispatch(socket(app))

		app.listen(port, () => this.onListening(port))
	}

	dispatch(io){
		io.on('connection', socket => {
			let id = this.getSessionId()
			let session = this.createSession(socket, id)

			if (session)
				socket.on('disconnect', () => this.onCloseSession(session, id))
			else
				socket.disconnect()
		})
	}

	onListening(){}

	onCloseSession(_){}
	createSession(_){}
	getSessionId(){
		return uuid()
	}

}

module.exports = {
    Session,
    Desk
}
