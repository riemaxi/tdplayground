
export default class Bra{
    constructor(source){
        this.socket = io()

        this.socket.on('init', data => this.onInit(data))
        this.socket.on('event', data => this.onEvent(data))
        this.socket.on('granted', data => this.onGranted(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    sendEvent(data){
        this.send('event', data)
    }

    onEvent(_){}
    onInit(_){}
    onGranted(_){}
}
