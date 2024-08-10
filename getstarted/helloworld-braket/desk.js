const config = require('./config')

class Desk extends require('./tdpnet').Desk{
    constructor(config){
        super(config)

        this.capacity = config.capacity  
        this.sessions = {}
    }

    get size(){
        return Object.keys(this.sessions).length
    }

    onListening(){}


    allow(socket, id){
        return this.size < this.capacity
    }

    createSession(socket, id){
        return this.allow(socket, id) ? this.sessions[id] = this.openSession(socket, id) : null
    }

    openSession(socket, id){ return null}

    onCloseSession(session, id){
        session.close()
        delete this.sessions[id]
    }
}

module.exports = Desk