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

        frame.data = {
            board: {
                configuration: state.configuration
            }
        }
        
        this.on('x')
    }

    update(id, data){
        frame.data = data
    }

    handleUser(id, data){
        this.on('x', data)
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }

    on(_){}
}
