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

    #toolbar{
        display: flex;
        justify-content: end;
        height: 30px;
        width: 100%;
        background-color: #8d7a7a;
        gap: 17px;
    }

    #toolbar div{
        display: flex;
        justify-content: center;
    }

    .tool{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;

        font-size: 14px;

        cursor: pointer;
    }
    
    .object{
        font-size: 2em;
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

    input{
        width: 100%;
    }

</style>`

const STRUCTURE = `
<div id="content">
    <div id="title"><div>Canvas</div></div>
    <div id="toolbar">
        <div>
            <input type="text" placeholder="project name">
        </div>
        <div>
            <div class="tool"><div class="button" id="new">&#128196;</div></div>
            <div class="tool"><div class="button" id="save">&#128190;</div></div>
            <div class="tool"><div class="button" id="recycle">&#9851;</div></div>
        </div>

        <div>
            <div class="tool"><div class="button" id="cut">&#9986;</div></div>
            <div class="tool"><div class="button" id="copy">&#9646;</div></div>
            <div class="tool"><div class="button" id="paste">&#9647;</div></div>
        </div>

        <div>
            <div class="tool"><div class="button" id="undo">&#10560;</div></div>
            <div class="tool"><div class="button" id="redo">&#10561;</div></div>
        </div>

        <div>
            <div class="tool"><div class="button" id="zoomin">&#10134;</div></div>
            <div class="tool"><div class="button" id="zoomout">&#10133;</div></div>
        </div>
    </div>
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
        this._current = value
    }

    getRatio(w, h){
        return {
            x: w / this.grid.size.width,
            y: h / this.grid.size.height
        }
    }

    get current(){
        return this._current
    }

    get topHeight(){
        let title = this.get('title')
        let toolbar = this.get('toolbar')
        return title.getBoundingClientRect().height +
                toolbar.getBoundingClientRect().height
    }

    control(){
        super.control()

        this.workspace = this.get('workspace')        
        this.workspace.onclick = e => this.handleWorkspace(e)

        this.queryAll('.button').forEach( b => b.onclick = () => console.log(b.id))
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

    get minWidth(){
        return 400
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
        this.get('workspace').style.height = (this.size.height - this.topHeight) + 'px'

        let ratio = this.getRatio(w,h)

        this.olayer.scale(ratio)
        this.llayer.scale(ratio)
        this.tlayer.scale(ratio)
    }

    handleWorkspace(e){
        if (this.current){
            let r = this.workspace.getBoundingClientRect()
            let x = e.clientX - r.x
            let y = e.clientY - r.y

           this.olayer.addObject('red', x, y, {...this.current})
           this.current = null           
        }

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