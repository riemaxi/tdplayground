import Window from "../common/window.js"

import ObjectLayer from "./objectlayer.js"
import LinkLayer from "./linklayer.js"
import TileLayer from "./tilelayer.js"
import ActionLayer from "./actionlayer.js"

const STYLE = `
    #content{
        display: flex;
        flex-direction: column;
        _justify-content: space-between;
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

    .link{
        cursor: pointer;
    }
    
    .object{
        font-size: 2em;
        cursor: pointer;
    }

    .layer{
        width: 100%;
        height: 100%;
    }

    #workspace{
        width: 100%;
        height: 100%;
        background-color: lightgreen;
    }

    input{
        width: 100%;
    }`

const STRUCTURE = `
<div id="content">
    <div id="title"><div>Canvas</div></div>
    <div id="toolbar">
        <div>
            <input id="project-name" type="text" placeholder="project name">
        </div>
        <div>
            <div class="tool"><div class="button" id="select">&#11110;</div></div>
            <div class="tool"><div class="button" id="link">&#11116;</div></div>            
        </div>
        <div>
            <div class="tool"><div class="button" id="new">&#128196;</div></div>
            <div class="tool"><div class="button" id="update">&#128190;</div></div>
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
        <svg class="layer" id="object-canvas"></svg>
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

       this.llayer = new LinkLayer(this.get('object-canvas'), this.grid.size, [])
        this.tlayer = new TileLayer(this.get('object-canvas'), this.grid.size, {})
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

        this.queryAll('.button').forEach( b => b.onclick = () => this.handleTool(b.id))
    }

    customStyle(){
        return STYLE
    }

    customStructure(){
        return STRUCTURE
    }

    addLink(ends){
        let {a, b} = ends
        let oa = a.data
        let ob = b.data

        let id = `${a.id}-${b.id}`
        let link = {
            id,
            feature: {
                a: a.id, 
                b: b.id,
                size: {
                    a: oa.feature.size,
                    b: ob.feature.size
                }
            },

            state: {
                a: {
                    x: oa.state.x + oa.feature.size / 2,
                    y: oa.state.y + oa.feature.size / 2
                },
                b: {
                    x: ob.state.x + ob.feature.size / 2,
                    y: ob.state.y  + ob.feature.size / 2
                }
            }
        }

        let items = {...this.llayer.data}
        items[id] = link

        return items
     }    

    controlLayers(){
        this.llayer.control()
        this.olayer.control()

        this.olayer.onChange = item => {
            this.llayer.updateLink(item)
        }

        this.olayer.onSelection = item => this.handleObject('selection', item)
        this.olayer.onRemoval = item => this.handleObject('removal', item)
        this.olayer.onLink = (a,b) => this.handleObject('link', {a,b})
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

    get project(){
        let time = Date.now()
        let name = this.get('project-name').value || ('project-' + time)
        this.get('project-name').value = name

        return {
            name,
            time
        }
    }

    set data(value){
        this.reset()

        this.tlayer.data = value.tiles        
        this.llayer.data = this.createLinks(value.links, value.objects)        
        this.olayer.data = value.objects

        this.update()

    }

    reset(){
        this.tlayer.reset()
        this.llayer.reset()
        this.olayer.reset()
    }

    update(){
        this.tlayer.update()
        this.llayer.update()
        this.olayer.update()

        this.controlLayers()        
    }

    scale(w, h){

        let ratio = this.getRatio(w,h)

        this.olayer.scale(ratio)
        this.llayer.scale(ratio)
        this.tlayer.scale(ratio)
    }

    addObject(o){
        this.olayer.addObject('red', 100,100, o)
    }

    handleTool(id){
        switch(id){
            case 'cut' : {
                            this.olayer.tool = id
                            this.llayer.tool = id
            }; break;
        
            case 'update' : this.handle('canvas.command', {
                id,
                detail: {
                    project: this.project,
                    data: {
                        tiles: this.tlayer.data,
                        links: this.llayer.data,
                        objects: this.olayer.data
                    }
                }
            }); break;

            case 'new': this.handle('canvas.command', {id, detail: this.project} ); break;

            case 'recycle': this.handle('canvas.command', {id, detail: this.project} ); break;
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

    handleObject(id, data){
        switch(id){
            case 'link' :  {
                    this.reset()
                    this.llayer.data = this.addLink(data) 
                    this.update()
                }; break;
            case 'removal' : this.llayer.removeLinks(data.id); break;
        }

        this.handle('object.' + id, data)
    }

    handle(_){}

}