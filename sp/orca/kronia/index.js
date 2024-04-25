const config = require('./config')

new class extends require('./prompt'){
    constructor(){
        super(config.prompt)
    }

    onGranted(data){
        console.log('granted as', data.address)

        this.start()
    }

    onDenied(data){
        console.log('denied as', data.address)
   }

   start(){
    let targets = Object.entries(this.peers).map( e => ({id: e[0], data: e[1]}))
    targets.forEach(target => {
        setInterval(() => this.notify(target.data.address, {id: target.id, data: target.data}), target.data.interval)
    })
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