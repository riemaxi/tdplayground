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
        height: 100%;
        background-color: black;
        color: white;
    }    
</style>
<div id="root">
    <div id="content">BADGE</div>
</div>
`

export default class Badge extends Element{
    constructor(){
        super(content)
    }
}