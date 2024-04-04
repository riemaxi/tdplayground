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

    update(id, data){
        frame.data = data
    }

    handleUser(id,  data){
        console.log(id, data)
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }
}