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

   onAccessRequest(data){

   }

   onLibraryRequest(data){

   }

   onNotificationRequest(data){

   }

   onSettingRequest(data){

   }

   onRepositoryRequest(data){

   }

   onAssistantRequest(data){

   }

   onRecycleRequest(data){
    
   }

}