
export default class Bra{
    constructor(source){
        this.socket = io('localhost:65333')

        this.socket.on('list', data => this.onList(data))

        this.sendList()
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    sendList(){
        console.log('send list')
        this.send('list',{})
    }

    onList(_){}
}