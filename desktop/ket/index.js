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
        frame.data = state.serviceproviders 
    }

    handleUser(id,  data){
        console.log(id, data)
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }
}