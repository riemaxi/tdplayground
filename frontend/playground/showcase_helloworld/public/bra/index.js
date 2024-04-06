
export default class Bra{
    constructor(source){
        this.socket = io()

        this.socket.on('init', data => this.onInit(data))
        this.socket.on('response', data => this.onResponse(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    sendRequest(id, data){
        this.send(id, data)
    }

    onResponse(_){}
    onInit(_){}
}
