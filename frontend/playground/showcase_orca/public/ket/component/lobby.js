import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #content{
        display: flex;
        flex-direction: column;
        width: 400px;
        height: 250px;
        background-color: white;
        border-radius: 10px;
        margin: auto;
        background-color: #deedf1;
    }

    #logo{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        width: 100%;
        height: 100%;
        font-family: Impact;
        color: gray;
    }

    #logo-img{
        width: 30%;
        border-radius: 7px;
    }

    #form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        gap: 6px;
    }

    #fields{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        gap: 2px;
    }

    #message{
        display: flex;
        align-items: center;
        height: 30px;
        color: red;
        font-family: Arial;
        font-weight: bold;
        font-size: .7em;
    }

      input, 
      select,
      button { 
          width: 200px; 
          height: 25px; 
          margin: 2px; 
          -moz-box-sizing: border-box; 
          -webkit-box-sizing: border-box; 
          box-sizing: border-box; 
          border-radius: 5px;
      } 

      button{
        background-color: black;
        color: white;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        border-radius: 6px;
      }    

</style>
<div id="root">
    <div id="content">
        <div id="logo">
            <img id="logo-img" src="./img/logo.png">
            <div>ORCA OS</div>
        </div>

        <div id="form">
            <div id="message"></div>
            <div id="fields">
                <div><select id="username"></select></div>
                <div><input id="password" type="password" placeholder="password"></div>
            </div>
            <div><button id="signin">sign in</button></div>
        </div>
    </div>
</div>
`

export default  class Lobby extends Element{
    constructor(){
        super(content)

        this.control()
    }

    control(){
            this.get('signin').onclick = () => this.handle('grant', this.data)
    }

    set data(value){
        let html = item => `<option id="${item.id}" data-role="${item.role}" value=${item.id} >${item.badge}</option>`

        this.get('username').innerHTML = value.map(item => html(item))
    }

    get data(){
        return {
            id: this.get('username').value,
            password: this.get('password').value
        }
    }

    set password(value){
        this.get('password').value = value
    }

    set message(value){
        this.get('message').innerText = value
    }

    show(){
        super.show()

        this.password = ''
        this.message = ''
    }
}