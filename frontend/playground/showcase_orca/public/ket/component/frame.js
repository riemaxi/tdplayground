import Element from "./common/element.js"

import Toolbar from "./toolbar/index.js"
import Palette from "./palette/index.js"
import Property from "./property/index.js"
import Console from "./console/index.js"
import Notification from "./notification/index.js"
import Recycle from "./recycle/index.js"
import Setting from "./setting/index.js"
import Badge from "./badge.js"
import Assistant from "./assistant/index.js"
import Canvas from "./canvas/index.js"


const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #content{
        display: grid;
        grid-template-columns: 2fr 10fr;
        width: 100%;
        height: 100%;
        background-color: red;
    }

    #canvas{
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
    }

    .window{
        position: absolute;
        display: none;
        width: 400px;
        height: 400px;
        left: 50px;
        top: 50px;
    }

    #toolbar{
        display: flex;
        width: auto;
        height: 50px;
    }

    #badge{
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 200px;
        height: 80px;
        border: 1px solid white;
        border-radius: 7px;
    }
</style>
<div id="root">
    <div id="content">
        <frame-canvas id="canvas"></frame-canvas>
        <frame-toolbar class="window" id="toolbar"></frame-toolbar>        
        <frame-palette class="window" id="palette"></frame-palette>        
        <frame-property class="window" id="property"></frame-property>        
        <frame-console class="window" id="console"></frame-console>
        <frame-repository class="window" id="repository"></frame-repository>
        <frame-recycle class="window" id="recycle"></frame-recycle>
        <frame-notification class="window" id="notification"></frame-notification> 
        <frame-setting class="window" id="setting"></frame-setting> 
        <frame-assistant class="window" id="assistant"></frame-assistant> 
        <frame-badge id="badge"></frame-badge>        
    </div>
</div>
`

export default class Frame extends Element{
    constructor(){
        super(content)

        this.control()
    }

    get size(){
        let r = this.root.getBoundingClientRect()
        return {width: r.width, height: r.height}
    }

    maxZindex(gap = 10){
        let list = this.queryAll('.window').map(item => item.style.zIndex)
    
        return Math.max(...list) + gap
    }
    

    control(){
        this.root = this.get('root')
        this.canvas = this.get('canvas')

        window.onresize = () => this.onResize(this.size)
        window.ondeviceorientation = () => this.onResize(this.size)

        this.get('toolbar').handle = id => this.handleToolbar(id)

        this.queryAll('.window').forEach( w => w.onFocus = ()  => w.show(this.maxZindex()) )
    }

    handleToolbar(id){
        if (id=='signout')
            this.handle('signout')
        else
            this.get(id).show(this.maxZindex())
    }

    set data(value){
        this.canvas.data = value

        let size = Math.min(this.size.width, this.size.height)
        this.canvas.scale(size, size)
    }

    onResize(_){
        let size = Math.min(this.size.width, this.size.height)
        this.canvas.scale(size, size)
    }
}

window.customElements.define('frame-canvas', Canvas)
window.customElements.define('frame-toolbar', Toolbar)
window.customElements.define('frame-palette', Palette)
window.customElements.define('frame-property', Property)
window.customElements.define('frame-console', Console)
window.customElements.define('frame-notification', Notification)
window.customElements.define('frame-recycle', Recycle)
window.customElements.define('frame-setting', Setting)
window.customElements.define('frame-assistant', Assistant)
window.customElements.define('frame-badge', Badge)
