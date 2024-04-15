import { 
    LobbyHandler,
    FrameHandler 
} from "./component/index.js"

import State from "./state.js"

let state = new State()

let frame = document.getElementById('frame')
let lobby = document.getElementById('lobby')

export default class Ket{
    constructor(){
        frame.handle = (id, data) => this.handleUser(id, data)
        lobby.handle = (id, data) => this.handleLobby(id, data)
    }

    init(data){
        state.session = data.session
        lobby.data = data.users
    }

    update(id, e){
        console.log('update', id, e)
    }

    handleUserSignout(){
        frame.hide()
        lobby.show()
    }

    handleUser(id, data){
        switch(id){
            case 'signout' : this.handleUserSignout(); break;
        }
    }

    handleLobby(id, data){
        this.on(id, data)

        lobby.hide()
        frame.show()
        frame.data = {
            badge:  {
                name: data.badge,
                role: data.role
            },
            objects: state.data,
            library: state.library
        }
    }

    on(_){}
}

window.customElements.define('play-frame', FrameHandler)
window.customElements.define('play-lobby', LobbyHandler)