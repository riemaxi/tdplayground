const config = require('./config')

let engine = new class extends require('./engine'){
    constructor(){
        super(config.engine)
    }
}

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

   onCheck(e){
        let {state, move} = e.detail
        console.log('on check', state, move)
        this.notify({data: e.detail, ok: engine.check(state, move) })
   }
}