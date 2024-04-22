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
        state.users = data.users
        lobby.data = state.users.map(u => ({id: u.id, badge: u.badge.screen, role: u.role}))
    }

    handleNetworkGranted(data){
        if (data.ok){
            lobby.hide()
            frame.show()

            let user = state.getUser(data.id)

            frame.data = {
                badge:  {
                    name: user.badge.screen,
                    role: user.role
                },
                objects: state.data,
                library: state.library
            }
        }else
            lobby.message = 'Acces denied'
    }

    update(id, e){
        switch(id){
            case 'granted' : this.handleNetworkGranted(e); break;
        }
    }

    handleUserSignout(){
        frame.hide()
        lobby.show()
    }

    handleUser(id, data){
        switch(id){
            case 'signout' : this.handleUserSignout(); break;
            case 'sp.command' : this.on(id, data); break;
            case 'canvas.command' : this.on(id, data); break;
        }
    }

    handleLobby(id, detail){
        detail.to = state.session.id
        this.on('session.command', {id,detail})
    }

    on(_){}
}

window.customElements.define('play-frame', FrameHandler)
window.customElements.define('play-lobby', LobbyHandler)