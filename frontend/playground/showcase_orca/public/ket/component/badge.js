import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        border-radius: inherit;        
    }

    #content{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: black;
        color: white;
        border-radius: inherit;
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