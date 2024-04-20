const config = require('./config')

const access = new class extends require('./handler/access'){
    constructor(){
        super(config.handler.access)
    }
}

const library = new class extends require('./handler/library'){
    constructor(){
        super(config.handler.library)
    }
}

const notification = new class extends require('./handler/library'){
    constructor(){
        super(config.handler.notification)
    }
}

const repository = new class extends require('./handler/repository'){
    constructor(){
        super(config.handler.repository)
    }
}

const recycle = new class extends require('./handler/recycle'){
    constructor(){
        super(config.handler.recycle)
    }
}

const setting = new class extends require('./handler/setting'){
    constructor(){
        super(config.handler.setting)
    }
}

const assistant = new class extends require('./handler/assistant'){
    constructor(){
        super(config.handler.assistant)
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


   on2MAMA(e){ 
        let {from, subject, detail} = e
        this.LA2YA(from)    
   }

   //request handler
   onRequest(data){
        let {from, subject, detail} = data
        console.log('on request', from, subject, detail)
   }

   onAccessRequest(data){
    let {from, subject, detail} = data
    console.log('on access request', from, subject, detail)
   }

   onLibraryRequest(data){
    let {from, subject, detail} = data
    console.log('on library request', from, subject, detail)
   }

   onNotificationRequest(data){
    let {from, subject, detail} = data
    console.log('on notification request', from, subject, detail)
   }

   onSettingRequest(data){
    let {from, subject, detail} = data
    console.log('on setting request', from, subject, detail)
   }

   onRepositoryRequest(data){
    let {from, subject, detail} = data
    console.log('on repository request', from, subject, detail)
   }

   onAssistantRequest(data){
    let {from, subject, detail} = data
    console.log('on assistant request', from, subject, detail)
   }

   onRecycleRequest(data){
    let {from, subject, detail} = data
    console.log('on recycle request', from, subject, detail)
   }

   //Event handler
   onEvent(data){
    let {from, subject, detail} = data
    console.log('on event', from, subject, detail)
   }

   onAccessEvent(data){
    let {from, subject, detail} = data
    console.log('on access event', from, subject, detail)
   }

   onLibraryEvent(data){
    let {from, subject, detail} = data
    console.log('on library event', from, subject, detail)
   }

   onNotificationEvent(data){
    let {from, subject, detail} = data
    console.log('on notification event', from, subject, detail)
   }

   onSettingEvent(data){
    let {from, subject, detail} = data
    console.log('on setting event', from, subject, detail)
   }
   
   onRepositoryEvent(data){
    let {from, subject, detail} = data
    console.log('on repository event', from, subject, detail)
   }

   onAssistantEvent(data){
    let {from, subject, detail} = data
    console.log('on assistant event', from, subject, detail)
   }

   onRecycleEvent(data){
    let {from, subject, detail} = data
    console.log('on recycle event', from, subject, detail)
   }
}