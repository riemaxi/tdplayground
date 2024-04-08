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

        frame.session.localId = state.session.id

        frame.data = {
            board: {
                configuration: state.configuration
            }
        }
    }

    update(id, data){
        frame.data = data
    }

    handleUserRole(data){
        frame.board.role = data

        if (data && data !== 'both')
            this.on('role', {peer: frame.session.peer, data})
    }

    handleUserPaste(){
        navigator.clipboard.readText()
            .then(data => {
                let json = JSON.parse(data)
                let configuration = state.normalize(json)
                frame.board.configuration = configuration

                this.on('paste', {peer: frame.session.peer, data: configuration})
            })
    }

    handleUser(id, data){
        switch(id){
            case 'copy' : navigator.clipboard.writeText(JSON.stringify(frame.board.configuration)); break;
            case 'paste' : this.handleUserPaste(); break;
            case 'move' : this.on('move', {peer: frame.session.peer, data}); break;
            case 'invite' : this.on('invite', {peer: frame.session.peer, data}); break;
            case 'role' : this.handleUserRole(data) ; break;
            case 'copy-id' : navigator.clipboard.writeText(data); break;
        }
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }

    on(_){}
}
