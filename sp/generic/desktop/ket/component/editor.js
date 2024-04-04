import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: blue;
    }

    #content{
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>
<div id="root">
    <div id="content">
        <h1>Editor</h1>
    </div>
</div>
`

export default class Editor extends Element{
    constructor(){
        super(content)
    }
}