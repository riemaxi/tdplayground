import Bra from "./bra/index.js"
import Ket from "./ket/index.js"

let ket = new class extends Ket{
    constructor(){
        super()
    }
}

let bra = new class extends Bra{
    constructor(){
        super()
    }

    onList(data){
        ket.update('list', data)
    }
}