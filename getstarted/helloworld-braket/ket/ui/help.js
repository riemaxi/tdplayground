import Element from './common/element.js'

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;

        background-color: #adaaa3;
    }
</style>
<div id="root">
</div>
`

export default class Help extends Element{
    constructor(){
        super(content)
    }

    control(){
        super.control()


    }
}

window.customElements.define('ccf-help', Help)