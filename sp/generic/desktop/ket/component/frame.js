import Element from "./common/element.js"
import GUI from "./gui.js"
import Editor from "./editor.js"
import Marketplace from "./marketplace.js"
import Splitter from "./common/splitter.js"

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
        height: 100%;
        justify-content: space-between;
    }

    #editor{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #gui{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #marketplace{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #project{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        
    }

    frame-splitter{
        width: 15px;
        height: 15px;
    }

    #v-splitter{
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 2px;
        background-color: black;
        top: 50%;
    }

    #h-splitter{
        position: absolute;        
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2px;
        height: 100%;
        background-color: black;
        left: 50%;
    }

</style>
<div id="root">
    <div id="content">
        <div id="project">
            <frame-editor id="editor"></frame-editor>
            <frame-marketplace id="marketplace"></frame-marketplace>   
        </div>

        <frame-gui id="gui"></frame-gui> 

        <!--div id="v-splitter">
            <frame-splitter id="v-grabber"></frame-splitter>
        </div>

        <div id="h-splitter">
            <frame-splitter id="h-grabber"></frame-splitter>
        </div -->

    </div>
</div>
`

class MarketplaceHandler extends Marketplace{
    constructor(){
        super()
    }
}

class EditorHandler extends Editor{
    constructor(){
        super()
    }
}

class GUIHandler extends GUI{
    constructor(){
        super()
    }
}


export default class Frame extends Element{
    constructor(){
        super(content)

        window.customElements.define('frame-editor', EditorHandler)
        window.customElements.define('frame-gui', GUIHandler)
        window.customElements.define('frame-marketplace', MarketplaceHandler)
        window.customElements.define('frame-splitter', Splitter)

        this.control()

    }

    control(){
        /*this.vSplitter.onDragging = p => {
            console.log('resizing ...')
            this.resizeProject(p.top)
        }*/
    }

    resizeProject(h){
        let panel = this.get('editor')
        panel.style.height = h + 'px'
    }
    
    get vSplitter(){
        return this.get('v-grabber')
    }

    get hSplitter(){
        return this.get('h-grabber')
    }


    get editor(){
        return this.get('editor')
    }

    get gui(){
        return this.get('gui')
    }

    get Marketplace(){
        return this.get('marketplace')
    }
}