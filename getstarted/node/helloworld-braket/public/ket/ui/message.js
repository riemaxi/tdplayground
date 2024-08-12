import Element from './common/element.js'

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #message{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 95%;
        overflow-y: auto;

        background-color: white;
        color: black;

        font-family: Arial;
        font-size: 2em;
    }
</style>
<div id="root">
    <div id="message"></div>
</div>
`

export default class Message extends Element{
    constructor(){
        super(content)
    }

    set data(value){
        let elem = this.get('message')
        let length = elem.innerText.split('\n').length

        if (length > 200)
                elem.innerText = ''
        else
            elem.innerText += value + '\n'

        this.onRequest({})
    }

    onRequest(_){}

}

window.customElements.define('hw-message', Message)