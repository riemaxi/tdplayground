import Lobby from "./lobby.js"
import Terminal from "./terminal.js"
import Market from "./market.js"
import Menu from "./menu.js"
import Setting from "./setting.js"
import Help from "./help.js"

export default class UI{
    constructor(){
        this.root = this.get('root')
        this.menu = this.get('menu')
        this.current = this.terminal = this.get('terminal')
        this.market = this.get('market')
        this.setting = this.get('setting')
        this.lobby = this.get('lobby')
        this.help = this.get('help')
    

        this.control()
    }

    get(id){
        return document.getElementById(id)
    }

    control(){
        this.lobby.on = r => this.onRequest(r.id, r.data)
        this.menu.on = id => this.handleMenu(id)
    }

    showLobby(){
        this.root.style.display = 'none'
        this.terminal.hide()
        this.lobby.show()
        document.title = 'Wallet'

        this.current.hide()
        this.current = this.terminal
    }

    showContent(profile){
            this.root.style.display = 'flex'

            this.current.show()
            this.lobby.hide()
            document.title = profile.badge
    }

    showPage(id){
        this.current.hide()

        this.current = this.get(id)
        this.current.show()
    }

    access(data){
        data ? this.showContent(data) : this.lobby.message = 'access denied'
    }

    set data(value){
    }

    update(id, data){
        switch(id){
            case 'newpassword' : this.lobby.message = 'check your email'; break;
        }
    }

    handleMenu(id){
        switch(id){
            case 'exit' : this.showLobby(); break;
            default: this.showPage(id);
        }
    }

    onRequest(_){}
 
}