import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: brown;
    }

    #content{
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>
<div id="root">
    <div id="content">
        <h1>GUI</h1>
    </div>
</div>
`

export default class GUI extends Element{
    constructor(){
        super(content)
    }
}