import Element from "./common/element.js"

import Toolbar from "./toolbar/index.js"
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

    #toolbar{
        position: absolute;
        display: flex;
        width: 400px;
        height: 400px;
        left: 50px;
        top: 50px;
    }
</style>
<div id="root">
    <div id="content">
        <frame-canvas id="canvas"></frame-canvas>
        <frame-toolbar id="toolbar"></frame-toolbar>        
    </div>
</div>
`

export default class Frame extends Element{
    constructor(){
        super(content)

        this.registerComponents()

        this.control()

        let objects = {}
        for(let id=0; id<=5; id++)
            objects[id] = {
                id,
                data: {
                    feature: {
                        color: ['red','blue','green', 'black', 'orange'][Math.floor(Math.random()*5)],
                        size : 2
                    },
                    state: {
                        x : 10 + Math.ceil(Math.random() * 25),
                        y : 10 + Math.ceil(Math.random() * 25)
                    }
                }
              }

        let links = {
            '0-1':{
                id: '0-1',
                feature: {a: 0, b:1}
            },
            '3-5': {
                id: '3-5',
                feature: {a: 3, b: 5}
            },
            '5-2': {
                id: '5-2',
                feature: {a: 5, b: 2}
            },
            '4-3': {
                id: '4-3',
                feature: {a: 4, b: 3}
            }
        }

        let tiles = {}

        this.canvas.data = {
                objects,
                links,
                tiles
        }

    }

    registerComponents(){
        window.customElements.define('frame-canvas', Canvas)
        window.customElements.define('frame-toolbar', Toolbar)
    }

    get size(){
        let r = this.root.getBoundingClientRect()
        return {width: r.width, height: r.height}
    }

    control(){
        this.root = this.get('root')
        this.canvas = this.get('canvas')

        window.onresize = () => this.onResize(this.size)
        window.ondeviceorientation = () => this.onResize(this.size)
    }

    set data(value){
    }

    onResize(size){
        size.width > size.height    ? this.canvas.scale(size.height, size.height )
                                    : this.canvas.scale(size.width, size.width )
    }
}