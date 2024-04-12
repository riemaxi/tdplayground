import Magnet from "./magnet.js"

const template = document.createElement('template')

const STYLE = `
<style>
    #root{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .magnet{
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: black;
        cursor: grab;
    }

    .magnet:hover{
        width: 60px;
        height: 60px;
        opacity: .6;
    }

    #resizer{
        bottom: -5px;
        right: -5px;
    }

    #resizer:hover{
        bottom: -30px;
        right: -30px;
    }

    #mover{
        position: absolute;
        border-radius: 50%;
        left: -15px;
        top: -15px;
        width: 30px;
        height: 30px;
        background-color: black;
        cursor: grab;
    }

    #mover:hover{
        width: 60px;
        height: 60px;
        left: -30px;
        top: -30px;
        opacity: .6;        
    }

    #closer{
        position: absolute;
        border-radius: 50%;
        right: -5px;
        top: -5px;
        width: 10px;
        height: 10px;
        background-color: black;
    }

    #closer:hover{
        width: 60px;
        height: 60px;
        right: -30px;
        top: -30px;
        opacity: .6;
    }

    CUSTOM

</style>
`

const STRUCTURE = `

<div id="root">
    <svg id="mover" width="30" height="30">
        <circle cx="50%" cy="50%" r="20%"  fill="white" />
    </svg>

    <svg id="closer" width="30" height="30">
        <circle cx="50%" cy="50%" r="20%"  fill="white" />
    </svg>

    CUSTOM

    <window-resizer id="resizer" class="magnet"></window-resizer>
</div>
`

class Mover{
    constructor(dragger, target, handle){
        this.dragger = dragger
        this.target = target

        this.last = {x:0, y:0}
        this.current = {x:0, y:0}
        this.control(handle)
    }

    control(handle){
        this.dragger.onmousedown = e => {
            e.stopPropagation()
            this.dragging = true

            this.last.x  = e.clientX
            this.last.y = e.clientY
            this.current.x = this.last.x
            this.current.y = this.last.y

            handle('start')
         }

        this.dragger.onmousemove = e => {
            e.stopPropagation()
            if (this.dragging){
                let position = this.move(e)
                handle('move', position)
            }
        }

        this.dragger.onmouseup = e => {
            e.stopPropagation()

            this.dragging = false
            handle('stop')
        }

        this.dragger.onmouseleave = e => {
            e.stopPropagation()

            this.dragging = false
            handle('stop')
        }
    }

    move(e){
        let x = e.clientX
        let y = e.clientY
        this.current.x =  this.last.x - x
        this.current.y = this.last.y - y
        this.last.x = x
        this.last.y  = y

        // set the element's new position:
        this.target.style.top = (this.target.offsetTop - this.current.y) + "px";
        this.target.style.left = (this.target.offsetLeft - this.current.x) + "px";

        return {left: this.target.style.left, top: this.target.style.top}
    }

    onStartDragging(){}
    onDragging(_){}
    onStoptDragging(){}
}

class Resizer extends Magnet{
    constructor(){
        super()
    }
}

export default class Window extends HTMLElement{
    constructor(resizable){
        super()

        this.shadow = this.attachShadow({mode: "open"})

        template.innerHTML = STYLE.replace('CUSTOM', this.customStyle) + STRUCTURE.replace('CUSTOM', this.customStructure)
                
        this.shadow.appendChild(template.content.cloneNode(true))

        this.root = this.shadow.getElementById('root')
        this.content = this.shadow.getElementById('content')
        this.resizer = this.shadow.getElementById('resizer')
        this.resizer.style.display = resizable ? 'block' : 'none'
        this.mover = this.shadow.getElementById('mover')

        this.control()

    }

    control(){
        let closer = this.shadow.getElementById('closer')
        closer.onclick = e => {
            e.stopPropagation()
            this.handleClose()
        }

        this.resizer.onStartDragging = () => this.onStartResizing()

        this.resizer.onDragging = p => {
            this.resize(p.left, p.top)
        }

        new Mover(
            this.mover,
            this, 
            (id, data) => {
                switch(id){
                    case 'start' : this.onStartDragging(); break;
                    case 'move' : this.onDragging(data); break;
                    case 'stop' : this.onStartDragging(); break;
                }
            })
    }

    resize(width, height){
        if (this.minWidth < width && this.minHeight < height){
            this.style.width = width + 'px'
            this.style.height = height + 'px'

            this.onResize(width, height)
        }
    }

    show(zIndex){
        this.visible = true
        this.style.zIndex = zIndex
    }

    hide(){
        this.visible = false
    }

    get customStructure(){
        return '<div></div>'
    }

    get customStyle(){
        return ''
    }

    get minHeight(){
        return 200
    }

    get minWidth(){
        return 200
    }

    set visible(value){
        this.style.display = value ? 'flex' : 'none' 
    }

    handleClose(){
        this.hide()
        this.onClose()
    }

    onClose(){}
    onDragging(_){}
    onStartDragging(){}
    onStopDragging(){}
    onStartResizing(){}
    onResize(){}
 }

 window.customElements.define('window-resizer', Resizer)