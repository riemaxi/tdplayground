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

    update(id, e){
        console.log(id, e)
        switch(id){
            case 'invite' : frame.session.peer = {id: e.from}; break;
            case 'move' : frame.board.move(e.data.piece, e.data.position); break;
            //case 'paste': frame.data = data; break;
        }
        
    }

    handleUserRole(data){
        frame.board.role = data

        if (data && data !== 'both')
            this.on('role', {peer: frame.session.peer.id, data})
    }

    handleUserPaste(){
        navigator.clipboard.readText()
            .then(data => {
                let json = JSON.parse(data)
                let configuration = state.normalize(json)
                frame.board.configuration = configuration

                this.on('paste', {peer: frame.session.peer.id, data: configuration})
            })
    }

    handleUser(id, data){
        switch(id){
            case 'copy' : navigator.clipboard.writeText(JSON.stringify(frame.board.configuration)); break;
            case 'paste' : this.handleUserPaste(); break;
            case 'move' : this.on('move', {peer: frame.session.peer.id, data}); break;
            case 'invite' : this.on('invite', {peer: data, data: frame.board.configuration}); break;
            case 'role' : this.handleUserRole({peer: frame.session.peer.id,  data}) ; break;
            case 'copy-id' : navigator.clipboard.writeText(data); break;
        }
    }

    registerComponents(){
        window.customElements.define('play-frame', FrameHandler)
    }

    on(_){}
}
