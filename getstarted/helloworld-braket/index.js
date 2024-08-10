const config = require('./config')

let system = new class extends require('./system'){
    constructor(){
        super(config.system)
    }

    onDenied(data){
        console.log('denied to', this.address)
    }

    onGranted(data){
        this.address = data.address
        console.log('granted to', this.address)
    }

    onRequest(r){
        let {id, to, data} = r.detail
        console.log(id, to, data)
    }

    onResponse(r){
        console.log(r.from, r.timestamp, r.detail)
        session?.notify('response', {id: '', data: r.detail})
    }
}

class Session{
    constructor(socket, id){
        this.socket = socket
        this.id = id 

        this.socket.on('request', data => this.handleRequest(data))

        this.notify('init', {session: {id}})

        console.log('open', id)
    }

    notify(id, data){
        this.socket.emit(id, data)
    }

    close(){
        console.log('close', this.id)
    }

    handleRequest(r){
        console.log(r)
        system.request(system.peers.greeter, r)
    }
}

let session = null 

new class extends require('./desk'){
    constructor(){
        super(config.desk)
    }

    onListening(){
        console.log('use the browser and navigate to', 'http://localhost:' + config.desk.port)
    }

    openSession(socket, id){
        return session =  new Session(socket, id)
    }

    onCloseSession(socket, id){
        super.onCloseSession(socket, id)
        session = null
    }
}
