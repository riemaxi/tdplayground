const config = require('./config')

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


	onRequest(e){
        let {from, subject, detail} = e
        this.response(from, {response: 'hello world', request: {subject, detail}})

        console.log('on request', from)
    }
}