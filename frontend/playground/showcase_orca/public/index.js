import Bra from "./bra/index.js"
import Ket from "./ket/index.js"

let ket = new class extends Ket{
    constructor(){
        super()
    }

    on(id, data){
        bra.sendEvent({id, ...data})
    }
}

let bra = new class extends Bra{
    constructor(){
        super()
    }

    onEvent(data){
        ket.update('event', data)
    }

    onInit(data){
        ket.init(data)
    }
}
