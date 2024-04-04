const config = require('./config')
const {v4 : uuid} = require('uuid')

new class extends require('./prompt'){
    constructor(){
        super(config.prompt)
    }

    onGranted(data){
        console.log('granted as', data.address)
    }

    onDenied(data){
        console.log('denied as', data.address)
    }

    notify(id, data){
        switch(id){
            case 'req' : this.request(data); break;
            case 'res' : this.response(data); break;
            case 'trn' : this.transition(data); break;
            case 'ack': this.transitionAck(data); break;
            case 'stm' : this.stream(data); break;
        }
    }

	//SP Publisher
	onAdded(e){}
	onRemoved(_){}
	onUpdated(_){}
	onList(_){}

	//SP
	onRequest(e){
        let {from, to, data} = e.detail
        desk.notifySession(to, 'req', {from, ...data})
    }
	onResponse(e){
        let {from, to, data} = e.detail
        desk.notifySession(to, 'res', {from, ...data})
    }

	onTransition(e){
        let {from, to, data} = e.detail
        desk.notifySession(to, 'trn', {from, ...data})
    }
	onTransitionAck(e){
        let {from, to, data} = e.detail
        desk.notifySession(to, 'ack', {from, ...data})
    }
	onStream(e){
        let {from, to, data} = e.detail
        desk.notifySession(to, 'stm', {from, ...data})
    }
}

class Session{
    constructor(socket, id){
        this.socket = socket 
        this.id = id

        //SP Publisher
        this.socket.on('add', data => prompt.addSP(data) )
        this.socket.on('remove', data => prompt.removeSP(data) )
        this.socket.on('update', data => prompt.updateSP(data) )
        this.socket.on('list', data => prompt.listSP(data) )

        //SP
        this.socket.on('req', e => desk.notifyPeer(id, e.to, 'req', e.data ))
        this.socket.on('res', e => desk.notifyPeer(id, e.to, 'res', e.data ))
        this.socket.on('trn', e => desk.notifyPeer(id, e.to, 'trn', e.data ))
        this.socket.on('ack', e => desk.notifyPeer(id, e.to, 'ack', e.data ))
        this.socket.on('stm', e => desk.notifyPeer(id, e.to, 'stm', e.data ))

        this.notify('init', {id})
    }

    notify(id, data){
        this.socket.emit(id, data)
    }

    close(){}
}

let desk = new class extends require('./core/desk'){
    constructor(){
        super(config.desk)
        this.sessions = {}
    }

    onListening(){
        console.log(config.desk.port)
    }

    notifySession(to, id, data){
        let session = this.sessions[to]
        session?.notify(id, data)
    }

    notifyPeer(from, to, id, data){
        let session = this.sessions[to]
        session && session.notify(id, data) || prompt.notify(id, {from, to, data})
    }

    createSession(socket){
        let id = uuid()
        return  this.sessions[id] = new Session(socket, id)
    }

    onCloseSession(session){
        session.close()
        delete this.sessions[session.id]
    }
}
