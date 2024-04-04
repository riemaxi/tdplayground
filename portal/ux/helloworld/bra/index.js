
export default class Bra{
    constructor(source){
        this.socket = io('localhost:65333')

        this.socket.on('list', data => this.onList(data))

        this.sendRequest()
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    sendRequest(){
        console.log('send list')
        this.send('request', {})
    }

    onResponse(_){}
}