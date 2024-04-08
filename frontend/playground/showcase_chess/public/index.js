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

    onResponse(data){
        ket.update('', data)
    }

    onInit(data){
        ket.init(data)
    }
}
