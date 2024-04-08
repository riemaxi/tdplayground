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

</style>
<div id="root">
    <div id="content">
        <img id="0" src="./img/perspective.png">
        <img id="1" src="./img/perspective.png">
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
    }

    onRotate(_){}

}