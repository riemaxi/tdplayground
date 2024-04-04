const config = require('./config')
const {v4: uuid} = require('uuid')


let prompt = new class extends require('./prompt'){
    constructor(){
        super(config.prompt)
    }

    onGranted(data){
        console.log('granted as', data.address)
    }

    onDenied(data){
        console.log('denied as', data.address)
    }

    onResponse(e){
        let {to, data} = e.detail
        desk.notify(to, 'response', data)        
    }
}

class Session{
    constructor(socket, id){
        this.socket =  socket
        this.id = id

        this.socket.on('helloworld', data => prompt.request('helloworld',  data.subject, data.detail) )
        this.socket.on('gis', data => prompt.request('gis', data.subject, data.detail) )
        this.socket.on('phone', data => prompt.request('phone', data.subject, data.detail) )
        this.socket.on('parec', data => prompt.request('parec', data.subject, data.detail) )
        this.socket.on('chess', data => prompt.request('chess', data.subject, data.detail) )
        this.socket.on('wallet', data => prompt.request('wallet', data.subject, data.detail) )

        this.notify('init', {id})
    }

    notify(id, data){
        this.socket.emit(id, data)
    }

    close(){
        
    }
}



let desk = new class extends require('./core/apidesk'){
    constructor(){
        super(config.desk)

        this.sessions = {}
    }

    notify(to, id, data){
        let session = this.sessions[to]
        session?.notify(id, data)
    }

    onListening(){
        console.log(config.desk.port)
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