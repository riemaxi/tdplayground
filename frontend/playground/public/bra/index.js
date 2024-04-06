
export default class Bra{
    constructor(source){
        this.socket = io()

        this.socket.on('init', data => this.onInit(data))
        this.socket.on('list', data => this.onList(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    sendList(data){
        this.send('list', data)
    }

    onInit(_){}
    onList(_){}
}
