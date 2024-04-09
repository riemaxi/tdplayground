import { 
    FrameHandler 
} from "./component/index.js"

import State from "./state.js"

let state = new State()

let frame = document.getElementById('frame')

export default class Ket{
    constructor(){
        this.registerComponents()        

        frame.handle = (id, data) => this.handleUser(id, data)
    }

    init(data){
        state.session = data.session
    }

    update(id, e){
        console.log('update', id, e)
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }

    on(_){}
}
