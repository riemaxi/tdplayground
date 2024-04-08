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

        frame.session.id = state.session.id

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

    handlePaste(){
        navigator.clipboard.readText()
            .then(data => {
                let configuration = JSON.parse(data)
                frame.data = {
                    configuration
                }
            })
    }


    handleUser(id, data){
        switch(id){
            case 'copy' : navigator.clipboard.writeText(JSON.stringify(data)); break;
            case 'paste' : this.handlePaste(); break;
            case 'move' : this.on('move', data); break;
            case 'invite' : this.on('invite', data); break;
        }
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }

    on(_){}
}
