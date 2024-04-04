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
        switch(id){
            case 'list': this.handleNetwork(data); break;
        }
    }

    handleNetwork(data){
        state.data = data
        frame.data = state.data
    }

    handleUser(id,  command){
        console.log(id, command)

        switch(command.id){
            case 'play' : window.location = command.location; break;
        }
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }
}