import Window from "../common/window.js"

const STYLE = `
#content{
    display: flex;
    width: 100%;
    height: 100%;
    background-color: red;
    color: white;
    font-family: Impact;

}
`

const STRUCTURE = `
<div id="content">
    <h1>PALETTE</h1>
</div>
`

export default class Palette extends Window{
    constructor(){
        super(true)
    }

    set data(value){
        console.log('palette value', value)
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }
    
}