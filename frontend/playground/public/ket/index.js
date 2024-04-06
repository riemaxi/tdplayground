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
	state.session = data
	this.on('list', {})
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
        switch(command.id){
            case 'play' : window.location = command.location; break;
            case 'repo' : window.location = command.location; break;
            case 'youtube' : window.location = command.location; break;
            case 'instagram' : window.location = command.location; break;
        }
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }
}
