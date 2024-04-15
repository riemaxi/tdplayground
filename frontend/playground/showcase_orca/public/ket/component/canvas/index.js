import Window from "../common/window.js"

import ObjectLayer from "./objectlayer.js"
import LinkLayer from "./linklayer.js"
import TileLayer from "./tilelayer.js"

const STYLE = `
<style>
    #content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: red;
    }

    #title{
        display: flex;
        height: 50px;
        width: 100%;
        background-color: black;
        align-items: center;
        font-family: Impact;        
        color: white;
    }
    
    #title div{
        margin-left: 5px;
    }
    
    .object{
        cursor: pointer;
    }

    .layer{
        position: absolute;
        width: 100%;
        height: 100%;
    }

    #workspace{
        display: flex;
        width: 100%;
        height: 300px;
        background-color: lightgreen;
    }

</style>`

const STRUCTURE = `
<div id="content">
    <div id="title"><div>Canvas</div></div>
    <div id="workspace">
        <svg class="layer" id="tile-canvas"/>
        <svg class="layer" id="link-canvas"/>
        <svg class="layer" id="object-canvas"/>
    </div>
</div>
`

export default class Canvas extends Window{
    constructor(){
        super(true)

        this.grid = {
            size : {
            width: 50,
            height: 50
           }
        }


       this.llayer = new LinkLayer(this.get('link-canvas'), this.grid.size, [])
        this.tlayer = new TileLayer(this.get('tile-canvas'), this.grid.size, {})
        this.olayer = new ObjectLayer(this.get('object-canvas'), this.grid.size, {})

    }

    set current(value){
        console.log('current', value)
        this._current = value
    }

    get current(){
        return this._current
    }

    control(){
        super.control()
        
        this.get('workspace').onclick = e => this.handleWorkspace(e)
    }

    customStyle(){
        return STYLE
    }

    customStructure(){
        return STRUCTURE
    }

    controlLayers(){
        this.olayer.onChange = item => {
            this.llayer.updateLink(item)
        }
    }

    createLinks(links, objects){
        Object.values(links).forEach(link => {
            let oa = objects[link.feature.a].data
            let ob = objects[link.feature.b].data

            link.feature.size = {
                a: oa.feature.size,
                b: ob.feature.size
            }

            link.state = {
                a: {
                    x: oa.state.x + oa.feature.size / 2,
                    y: oa.state.y + oa.feature.size / 2
                },
                b: {
                    x: ob.state.x + ob.feature.size / 2,
                    y: ob.state.y  + ob.feature.size / 2
                }
            }
        })

        return links
    }

    set data(value){
        this.olayer.data = value.objects

        this.llayer.data = this.createLinks(value.links, value.objects)

        this.tlayer.data = value.tiles

        this.controlLayers()
    }

    scale(w, h){
        this.get('workspace').style.height = (this.size.height - 50) + 'px'

         let ratio = {
            x: w / this.grid.size.width,
            y: h / this.grid.size.height
        }

        this.olayer.scale(ratio)
        this.llayer.scale(ratio)
        this.tlayer.scale(ratio)
    }

    handleWorkspace(e){
        console.log('place object', this.current)
    }

    onResize(w, h){
        let msize = Math.min(w, h)
        this.scale(msize, msize)
    }

    show(index){
        super.show(index)
        
        let msize = Math.min(this.size.width, this.size.height)
        this.scale(msize, msize)

    }

}