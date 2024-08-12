import UI from "./ui/index.js"

let ui = new class extends UI{
    constructor(){
        super()
    }
}

export default class Ket{
    constructor (){
        ui.onRequest = (id, data) => this.on('request', {id, data})
    }

    init(data){
        this.sesssion = data.session

        this.on('request', {id: 'hello', data: {}})
    }

    response(id, data){
        switch(id){
            default: ui.data  = data;
        }
    }
    
    on(_){}
}
