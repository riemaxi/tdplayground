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


   on2MAMA(e){ 
        let {from, subject, detail} = e
        this.LA2YA(from)    
   }

	onEvent(e){
        let {from,detail} = e
        console.log('on event', from, detail)
    }
}