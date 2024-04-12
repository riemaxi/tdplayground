import Window from "../common/window.js"

const STYLE = `
#content{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    background-color: green;
    color: white;
    font-family: Impact;
}

.tool{
    display: flex;
    flex-direction: column;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
}

.caption{
    font-family: Arial;
    font-size: 10px;
}

.button{
    cursor: pointer;
}
`

const STRUCTURE = `
<div id="content">
    <div class="tool"><div class="button" id="palette">P</div><div class="caption">Palette</div></div>
    <div class="tool"><div class="button" id="console">C</div><div class="caption">Console</div></div>    
    <div class="tool"><div class="button" id="notification">N</div><div class="caption">Notification</div></div>
    <div class="tool"><div class="button" id="setting">S</div><div class="caption">Setting</div></div>
    <div class="tool"><div class="button" id="property">T</div><div class="caption">Property</div></div>
    <div class="tool"><div class="button" id="repository">E</div><div class="caption">Repository</div></div>
    <div class="tool"><div class="button" id="recycle">R</div><div class="caption">Recycle</div></div>
    <div class="tool"><div class="button" id="signout">O</div><div class="caption">Sign out</div></div>
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