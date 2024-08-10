import Element from './common/element.js'

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;

        background-color: #a78234;
    }
</style>
<div id="root">
</div>
`

export default class Setting extends Element{
    constructor(){
        super(content)
    }

    control(){
        super.control()
    }
}

window.customElements.define('ccf-setting', Setting)