
const SP_NAME = 'helloworld'

export default class Bra{
    constructor(source){
        this.socket = io('localhost:65335')

        this.socket.on('init', data => this.onInit(data))
        this.socket.on('response', data => this.onResponse(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    sendRequest(data){
        this.send(SP_NAME, data)
    }

    onResponse(_){}
    onInit(_){}
}