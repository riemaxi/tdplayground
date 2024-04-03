const config = require('./config')
const {v4: uuid} = require('uuid')

let db = new class extends require('./data'){
    constructor(){
        super(config.data)
    }

    listSPs(){
        return this.sp.list()
    }

    addSP(data){
        return this.sp.add(data)
    }

    removeSP(id){
        this.sp.remove(id)
    }

    updateSP(cdata){
        let {id, data} = cdata
        this.sp.update(id, data)
    }

    addInterface(idata){
        let {id, data} = idata
        this.sp.addInterface(id, data)
    }
}

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

	onAdd(data){
        console.log('on add', data.detail)
        db.add(data.detail)

        this.notify(data.from, 'added', data.detail)
    }
	onRemove(data){
        console.log('on remove', data.detail)
        db.remove(data.detail)

        this.notify(data.from, 'removed', data.detail)        
    }

	onUpdate(data){
        console.log('on update', data.detail)
        db.update(data.detail)

        this.notify(data.from, 'updated', data.detail)        
    }

	onList(data){
        console.log('on list', e.detail)
        this.list(e.from, db.listSPs() ) 

    }

	onAddInterface(data){
        console.log('on add interface', e.detail)
        db.addInterface(e.detail)

        this.notify(data.from, 'interface-added', data.detail)        
    }
	onRemoveInterface(data){
        console.log('on remove interface', e.detail)
        db.removeInterface(e.detail)
        this.notify(data.from, 'interface-removed', data.detail)        
    }

	onUpdateInterface(data){
        console.log('on remove interface', e.detail)
        db.updateInterface(e.detail)
        this.notify(data.from, 'interface-updated', data.detail)        
    }
}

class Session{
    constructor(socket, id){
        this.socket =  socket
        this.id = id

        this.socket.on('list', data => this.notify('list', db.listSPs(data)))
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