import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        _background-color: #87551D;
    }

    #content{
        display: flex;
        height: 50px;
        gap: 20px;
        margin: auto;
    }

    img{
        height: 100%;
        cursor: pointer;
    }

    img[id="0"]{
        transform: rotate(90deg)
    }

    img[id="1"]{
        transform: rotate(-90deg)
    }

    #clipboard{
        display: flex;
        font-size: 30px;
        gap: 20px;
        border: 1px solid;
        border-radius: 10px;    
    }

    .clipboard-action{
        cursor: pointer;
    }

</style>
<div id="root">
    <div id="content">
        <img id="0" src="./img/perspective.png">
        <img id="1" src="./img/perspective.png">

        <div id="clipboard">
            <div class="clipboard-action" id="copy">&#x2398;</div>        
            <div class="clipboard-action" id="paste">&#128203;</div>
        </div>
    </div>
</div>
`

export default class Toolbar extends Element{
    constructor(){
        super(content)

        this.control()
    }

    control(){
        let perspectives = this.queryAll('img')
        perspectives.forEach(p => p.onclick = () => this.onRotate(p.id))

        let  clipboard = this.queryAll('.clipboard-action')
        clipboard.forEach(b => b.onclick = () => this.handle(b.id))
    }

    onRotate(_){}

}