import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: #87551D;
    }
</style>
<div id="root">
</div>
`

export default class Toolbar extends Element{
    constructor(){
        super(content)

        this.control()
    }

    control(){

    }

}