
export default class Bra{
    constructor(){
        this.socket = io()

        this.socket.on('init', data => this.onInit(data))

        //SP Publisher
        this.socket.on('added', data => this.onSPadded(data))
        this.socket.on('removed', data => this.onSPremoved(data))
        this.socket.on('updated', data => this.onSPupdated(data))
        this.socket.on('list', data => this.onSPlist(data))

        //SP
        this.socket.on('req', data => this.onRequest(data))
        this.socket.on('res', data => this.onResponse(data))
        this.socket.on('trn', data => this.onTransition(data))
        this.socket.on('ack', data => this.onTransitionAck(data))
       this.socket.on('stm', data => this.onStream(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    sendRequest(data){
        this.send('req', data)
    }

    sendResponse(data){
        this.send('res', data)
    }

    sendTransition(data){
        this.send('trn', data)
    }

    sendTransitionAck(data){
        this.send('ack')
    }

    onInit(_){}

    //SP Publisher
    onSPadded(_){}
    onSPremoved(_){}
    onSPupdated(_){}
    onSPlist(_){}
    
    //SP
    onRequest(_){}
    onResponse(_){}
    onTransition(_){}
    onTransitionAck(_){}
    onStream(_){}
}