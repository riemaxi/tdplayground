import Element from './common/element.js'

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;

        background-color: #a79670;
    }
</style>
<div id="root">
</div>
`

export default class Market extends Element{
    constructor(){
        super(content)
    }

    control(){
        super.control()


    }
}

window.customElements.define('ccf-market', Market)