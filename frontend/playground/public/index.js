import Bra from "./bra/index.js"
import Ket from "./ket/index.js"

let ket = new class extends Ket{
    constructor(){
        super()
    }

    on(id, data){
	switch(id){
		case 'list': bra.sendList(data); break;
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

    onList(data){
        ket.update('list', data)
    }
}
