import Window from "../common/window.js"

const STYLE = `
#content{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    background-color: #8d7a7a;
    color: white;
    font-family: Impact;
    gap: 20px;
}

.tool{
    display: flex;
    flex-direction: column;
    height: 40px;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.caption{
    font-family: Arial;
    font-size: 10px;
}

.button{
    cursor: pointer;
}
`

/**
 * 128924
 * 10024
 */
const STRUCTURE = `
<div id="content">
    <div class="tool"><div class="button" id="canvas">&#128306;</div><div class="caption">Canvas</div></div>
    <div class="tool"><div class="button" id="palette">&#9874;</div><div class="caption">Palette</div></div>
    <div class="tool"><div class="button" id="console">&#9760;</div><div class="caption">Console</div></div>    
    <div class="tool"><div class="button" id="notification">&#9873;</div><div class="caption">Notification</div></div>
    <div class="tool"><div class="button" id="setting">&#9881;</div><div class="caption">Setting</div></div>
    <div class="tool"><div class="button" id="property">&#9777;</div><div class="caption">Property</div></div>
    <div class="tool"><div class="button" id="repository">&#10070;</div><div class="caption">Repository</div></div>
    <div class="tool"><div class="button" id="assistant">&#9086;</div><div class="caption">Assistant</div></div>
    <div class="tool"><div class="button" id="recycle">&#9851;</div><div class="caption">Recycle</div></div>
    <div class="tool"><div class="button" id="signout">&#8658;</div><div class="caption">Sign out</div></div>
</div>
`

export default class Toolbar extends Window{
    constructor(){
        super()
    }

    control(){
        super.control()

        this.queryAll('.button').forEach(b => b.onclick = () => this.handle(b.id))
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }

    handle(_){}
    
}