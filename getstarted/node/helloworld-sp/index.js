const config = require('./config')

new class extends require('./system'){
    constructor(){
        super(config.system)
    }

    onDenied(data){
        console.log('denied to', this.address)
    }

    onGranted(data){
        this.address = data.address
        console.log('granted to', this.address)
        this.request(this.peers.greeter, {})
    }

    onRequest(r){
        let {id, to, data} = r.detail
        console.log(id, to, data)
    }

    onResponse(r){
        console.log(r.from, r.timestamp, r.detail)
        this.request(r.from, {})
    }
}
