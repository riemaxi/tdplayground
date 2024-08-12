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
        console.log('init', data)

        //this.on('request', {id: 'signin', data: ui.lobby.data})
    }

    response(id, data){
        switch(id){
            case 'signin' : ui.access(data); break;
        }
    }

    update(id, data){
        ui.update(id, data)
    }

    on(_){}
}
