import Element from "./common/element.js"
import Header from "./header.js"
import List from "./list.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #content{
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    #header{
        display: flex;
        height: 100px;
    }

    #list{
        display: flex;
        height: 100%;
    }    
</style>
<div id="root">
    <div id="content">
        <play-header id="header"></play-header>
        <play-list id="list"></play-list>
    </div>
</div>
`

class ListHandler extends List{
    constructor(){
        super()
    }
}

export default class Frame extends Element{
    constructor(){
        super(content)

        window.customElements.define('play-list', ListHandler)
        window.customElements.define('play-header', Header)

        this.control()
    }

    control(){
        this.list = this.get('list')
        this.list.handle = (id, data) => this.handle(id, data)
    }

    set data(value){
        this.list.data = value
    }
}