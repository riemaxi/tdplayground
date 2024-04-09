import Element from "./common/element.js"

import Canvas from "./canvas.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #content{
        display: flex;
        flex-direction: column;
        margin: auto;
        width: 100%;
        height: 100%;
    }

    #canvas{
        display: flex;
        width: 100%;
        height: 100%;
    }
</style>
<div id="root">
    <div id="content">
        <frame-canvas id="canvas"></frame-canvas>
    </div>
</div>
`

export default class Frame extends Element{
    constructor(){
        super(content)

        this.registerComponents()

        this.control()

        this.canvas.data = [...Array(20)].map(() => ({
            id : Date.now(),
            shape : ['c', 'r'][Math.floor(Math.random()*2)],
            data: {
                color: ['red','blue','green', 'black', 'orange'][Math.floor(Math.random()*5)],
                x : Math.ceil(Math.random()*40),
                y : Math.ceil(Math.random()*40),
                size : Math.ceil(Math.random()*10)
            }


        }))
    }

    registerComponents(){
        window.customElements.define('frame-canvas', Canvas)
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