const template = document.createElement('template')
template.innerHTML = `
<style>
    #root{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    </style>
<div id="root">
    CONTENT
</div>
`

export default class Magnet extends HTMLElement{
    constructor(){
        super()

        this.shadow = this.attachShadow({mode: "open"})

        template.innerHTML = template.innerHTML.replace('CONTENT', this.content)
        this.shadow.appendChild(template.content.cloneNode(true))

        this.visible = true

        this.root = this.shadow.getElementById('root')

        this.control()

        this.initialize({x: 0, y: 0})
    }

    get content(){
        return `<svg width="30" height="30">
                    <circle cx="50%" cy="50%" r="20%"  fill="white" />
                </svg>`
    
    }

    initialize(p){
        this.last = {x: p.x, y: p.y}
        this.current = {x: p.x, y: p.y}
    }

    center(p){
        let r = this.getBoundingClientRect()
        return {left: p.left + r.width  / 2, top: p.top + r.height / 2}
     }

    control(){
        this.root.onmousedown = e => {
            this.dragging = true

            this.last.x  = e.clientX
            this.last.y = e.clientY
            this.current.x = this.last.x
            this.current.y = this.last.y

            this.onStartDragging && this.onStartDragging()
         }

        this.root.onmousemove = e => {
            if (this.dragging){
                e.preventDefault()
                this.onDragging && this.onDragging(
                    this.center( this.position(e) )
                )
            }

            this.root.onmouseup = e => {
                e.preventDefault()
                this.dragging = false

                this.onStopDragging && this.onStopDragging()
            }
    

            this.root.onmouseleave = e => {
                e.preventDefault()
                this.dragging = false
                this.onStopDragging && this.onStopDragging()
            }
    
        }

    }

    position(e){
        let x = e.clientX
        let y = e.clientY
        this.current.x =  this.last.x - x
        this.current.y = this.last.y - y
        this.last.x = x
        this.last.y  = y

        // set the element's new position:
        let top = this.offsetTop - this.current.y
        let left = this.offsetLeft - this.current.x

        return {left, top}
    }


    move(e){
        let x = e.clientX
        let y = e.clientY
        this.current.x =  this.last.x - x
        this.current.y = this.last.y - y
        this.last.x = x
        this.last.y  = y

        // set the element's new position:
        let top = this.offsetTop - this.current.y
        let left = this.offsetLeft - this.current.x

        this.style.top = top + "px";
        this.style.left = left + "px";

        return {left, top}
    }

    show(zIndex){
        this.visible = true
        this.style.zIndex = zIndex
    }

    hide(){
        this.visible = false
    }

    set visible(value){
        this.style.display = value ? 'flex' : 'none' 
    }
 
     onDragging(_){}
    onStartDragging(){}
    onStopDragging(){}
 }