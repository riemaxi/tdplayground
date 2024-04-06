const config = require('./config')

let data = new class extends require('./data'){
    constructor(){
        super(config.data)
    }

    create(data){
        return this.state.create(data)
    }

    reset(data){
        let {password, id} = data
        return this.state.reset(id)
    }

    update(udata){
        let {password, id, data} = udata
        return this.state.update(id, data)
    }

    remove(data){
        let {password, id} = data
        return this.state.remove(id)
    }

    get(id){
        return this.state.getData(id)
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

   onCreate(e){
        console.log('on create', e.detail)
        this.notify('create', data.create(e.detail))
   }

   onReset(e){
        console.log('on reset', e.detail)
        this.notify('reset', data.reset(e.detail) )
   }

   onUpdate(e){
        console.log('on update', e.detail)
        this.notify('update', data.update(e.detail))
   }

   onRemove(e){
        console.log('on remove', e.detail)
        this.notify('remove', data.remove(e.detail))
   }

   onState(e){
    console.log('on state', e.detail)
    this.state(e.from, data.get(e.detail) )
   }

}