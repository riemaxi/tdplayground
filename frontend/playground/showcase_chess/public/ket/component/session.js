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
        width: 100%;
        margin: auto;
    }

    #header{
        display: flex;
        justify-content: center;
        font-size: 15px;
        gap: 10px;
    }

    #copy{
        cursor: pointer;
    }

    #id{
        font-family: Impact;
    }

    #peer-id{
    
        width: 100%;
    }

    #footer{
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    #peer-box{
        display: flex;
        height: 100%;
        gap: 10px;
    }

    #peer-box img{
        height: 20px;
        cursor: pointer;
    }

    #role{
        display: flex;
        border: 1px solid black;
        border-radius: 20%;
        height: 100%;        
    }

    .role-box{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20%; 
        height: 100%;
    }

    #black-box{
        background-color: black;
    }
</style>
<div id="root">
    <div id="content">
        <div id="header">
            <div id="id"></div>
            <div id="copy">&#x2398;</div>
        </div>
        <div id="footer">
            <div id="peer-box">
                <input id="peer-id" type="text" placeholder="peer id">
                <img id="invite" src="./img/invite.png">
            </div>
            <div id="role">
                <div class="role-box" id="black-box"><input id="black" type="checkbox"></div>
                <div class="role-box" id="white-box"><input id="white" type="checkbox" checked></div>
            </div>
        </div>
    </div>
</div>
`

export default class Session extends Element{
    constructor(){
        super(content)

        this.registerComponents()

        this.control()
    }

    control(){
        this.queryAll('.role-box').forEach(rb => rb.onclick = () => this.handle('role', this.role))

        this.get('copy').onclick = () => this.handle('copy-id', this.localId )
        this.get('invite').onclick = () => this.handle('invite', this.peer.id )
    }

    get localId(){
        return this.get('id').innerText
    }

    set localId(value){
        this.get('id').innerText = value
    }

    get peer(){
        return {
            id: this.get('peer-id').value
        }
    }

    registerComponents(){
    }


     set data(value){
        console.log('session data', value)
    }

    get role(){
        let w = this.get('white')
        let b = this.get('black')

        if (b.checked && w.checked) 
            return 'both'

        if (b.checked && !w.checked)
             return 'b'

        if (w.checked && !b.checked)
            return 'w'

        return null
    }

    set role(value){
        this.get('white').checked = value == 'w'
        this.get('black').checked = value ==  'b'
    }

    set peer(value){
        this.get('peer-id').value = value.id
    }

    handleRole(){
        //this.handle('role', this.role)
    }
}