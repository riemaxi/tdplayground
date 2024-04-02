import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        border: 0 0 1px 0;
        border-color: black;
        font-family: Arial;
    }
</style>
<div id="root">
    <h1>TDPnet playgrund</h1>
</div>
`
export default class Header extends Element{
    constructor(){
        super(content)
    }
}