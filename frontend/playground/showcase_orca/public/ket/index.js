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
        //lobby.data = state.users.map(u => ({id: u.id, badge: u.badge.screen, role: u.role}))
        this.on('session.command', {id: 'grant', detail: {id: '1000', password: 'password123', to: state.session.id}})
    }

    handleNetworkProject(data){
        console.log('project', data)
    }

    handleNetworkGranted(data){
        if (data.ok){
            lobby.hide()
            frame.show()

            state.session.user = {
                ...state.getUser(data.id), 
                projects: data.projects,
                library: {
                    nodes: data.library[0].data.nodes,
                    links: data.library[0].data.links
                }
            }

            frame.data = {
                badge:  {
                    name: state.session.user.badge.screen,
                    role: state.session.user.role
                },
                objects: state.getProject(),
                library: state.session.user.library
            }
        }else
            lobby.message = 'Acces denied'
    }

    update(id, e){
        switch(id){
            case 'granted' : this.handleNetworkGranted(e); break;
            case 'project' : this.handleNetworkProject(e); break;
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
            case 'canvas.command' : this.handleUserCanvas(data); break;
        }
    }

    handleUserCanvas(command){
        command.to = state.session.id
        command.detail.project.owner = state.session.user.id
        console.log('handle user canvas', command)
        this.on('canvas.command',  command)
    }

    handleLobby(id, detail){
        detail.to = state.session.id
        this.on('session.command', {id, detail})
    }

    on(_){}
}

window.customElements.define('play-frame', FrameHandler)
window.customElements.define('play-lobby', LobbyHandler)