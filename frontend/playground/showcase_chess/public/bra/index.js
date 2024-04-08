
export default class Bra{
    constructor(source){
        this.socket = io()

        this.socket.on('init', data => this.onInit(data))
        this.socket.on('move', data => this.onMove(data))
        this.socket.on('invite', data => this.onInvite(data))
        this.socket.on('role', data => this.onRole(data))
        this.socket.on('paste', data => this.onPaste(data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    onMove(_){}
    onInvite(_){}
    onRole(_){}
    onPaste(_){}
    onInit(_){}
}
