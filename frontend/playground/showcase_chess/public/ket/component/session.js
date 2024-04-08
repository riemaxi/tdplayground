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
                <img src="./img/invite.png">
            </div>
            <div id="role">
                <div class="role-box" id="black-box"><input id="black" type="radio" name="role"></div>
                <div class="role-box" id="white-box"><input id="white" type="radio" name="role" checked></div>
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

    }

    registerComponents(){
    }


     set data(value){
        console.log('session data', value)
    }

    set id(value){
        this.get('id').innerText = value
    }
}