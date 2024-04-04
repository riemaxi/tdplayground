import Bra from "./bra/index.js"
import Ket from "./ket/index.js"

let ket = new class extends Ket{
    constructor(){
        super()
    }

    on(id, data){
        switch(id){
            case 'req': bra.sendRequest(data); break;
            case 'res': bra.sendResponse(data); break;
            case 'trn': bra.sendTransition(data); break;
            case 'ack': bra.sendTransitionAck(data); break;
            case 'stm': bra.sendStream(data); break;
        }
    }
}

let bra = new class extends Bra{
    constructor(){
        super()
    }

    onInit(data){
        ket.init(data)
    }

    //SP Publisher
    onSPadded(data){
        ket.update('added', data)
    }
    onSPremoved(data){
        ket.update('removed', data)
    }
    onSPupdated(data){
        ket.update('updated', data)
    }
    onSPlist(data){
        ket.update('list', data)
    }

    //SP
    onRequest(data){
        ket.update('req', data)
    }
    onResponse(data){
        ket.update('res')
    }
    onTransition(data){
        ket.update('trn', data)
    }

    onTransitionAck(data){
        ket.update('ack', data)
    }

    onStream(data){
        ket.update('stm', data)
    }
}