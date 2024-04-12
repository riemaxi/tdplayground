import Window from "../common/window.js"

const STYLE = `
#content{
    display: flex;
    width: 100%;
    height: 100%;
    background-color: blue;
    color: white;
    font-family: Impact;

}
`

const STRUCTURE = `
<div id="content">
    <h1>PROPERTY</h1>
</div>
`

export default class Property extends Window{
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