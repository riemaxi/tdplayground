import Window from "../common/window.js"

const STYLE = `
#content{
    display: flex;
    width: 100%;
    height: 100%;
    background-color: orange;
    color: white;
    font-family: Impact;

}
`

const STRUCTURE = `
<div id="content">
    <h1>SETTING</h1>
</div>
`

export default class Setting extends Window{
    constructor(){
        super(true)
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }
    
}