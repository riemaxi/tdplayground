import Element from './common/element.js'

const content = `
<style>
    #root{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        background-color: #725412;
        color: white;
    }

    #content{
        display: flex;
        flex-direction: column;
        width: 300px;
        justify-content: space-between;
        align-items: center;
        gap: 11px;
    }

    #logo{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 90px;
    }

    #logo img{
        height: 100%;
        border-radius: 10px;
    }

    #form{
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    input{
        width: 100%;
    }

    button{
        width: 60px;
    }

    #command{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    #message{
        height: 20px;
        font-weight: bold;
        font-size: 1.5em;
    }
</style>
<div id="root">
    <div id="content">
        <div id="logo"><img src="./res/logo.jpg" alt="logotype"></div>

        <div id="form">
            <div class="field"><input id="password" type="password" value="alexei"></div>
            <div id="command">
                <button id="signin">submit</button>
                <button id="new">new</button>
            </div>
        </div>
        <div id="message"></div>
    </div>
`

export default class Lobby extends Element{
    constructor(){
        super(content)
    }

    set message(data){
        this.get('message').innerText = data
    }

    get data(){
        return this.get('password').value
    }

    control(){
        super.control()

        this.get('signin').onclick = () => this.on({id: 'signin', data: this.data})
        this.get('new').onclick = () => this.on({id: 'newpassword', data: {}})
    }

    show(){
        super.show()
        this.message = ''
    }

    on(_){}
}

window.customElements.define('ccf-lobby', Lobby)