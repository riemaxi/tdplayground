import Bra from "./bra/index.js"
import Ket from "./ket/index.js"

let ket = new class extends Ket{
    constructor(){
        super()
    }

    on(id, data){
        bra.send(id, data)
    }
}

let bra = new class extends Bra{
    constructor(){
        super()
    }

    onMove(data){
        ket.update('move', data)
    }

    onPaste(data){
        ket.update('paste',  data)
    }

    onRole(data){
        ket.update('role', data)
    }

    onInvite(data){
        ket.update('invite', data)
    }

    onInit(data){
        ket.init(data)
    }
}
