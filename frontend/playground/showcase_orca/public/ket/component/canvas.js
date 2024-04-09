import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    .object{
        cursor: pointer;
    }

</style>
<div id="root">
    <svg id="canvas" width="100%" height="100%">
    </svg>  
</div>
`


export default class Canvas extends Element{
    constructor(){
        super(content)

        this.size = {
            x: 50,
            y: 50
        }

        this.canvas = this.get('canvas')

        this.ratio = {
            x: this.canvas.getBoundingClientRect().width / this.size.x ,
            y: this.canvas.getBoundingClientRect().height / this.size.y
        }
    }

    control(){
        this.queryAll('.object').forEach(o => {
            o.onpointerdown = e => {
                this.selectObject(o)
                this.control()

                this.current = o
                this.delta = {
                    x: e.offsetX - o.getAttribute('x'),
                    y: e.offsetY - o.getAttribute('y')
                }
            }

            o.onpointerup = e => {
                this.current = null
                this.delta = null
            }
        })

        this.canvas.onpointermove = e => {
            if (!this.current)
            return 

            let r = this.canvas.getBoundingClientRect()

            let x = e.clientX - r.x - this.delta.x
            let y = e.clientY - r.y - this.delta.y

            this.current.setAttribute('x', x)
            this.current.setAttribute('y', y)

            let item = this.items[this.current.id]
            item.data.x = x / this.ratio.x
            item.data.y = y / this.ratio.y
        }

    }

    selectObject(o){
        o.remove()
        this.canvas.appendChild(o)
    }

    addObject(data){
        this.canvas.innerHTML += this.object(data)
    }

    rectangle(id, data){
        let {x,y, size, color} = data
        return `<rect class="object" id="${id}" x=${x * this.ratio.x} y="${y *  this.ratio.y}" width="${x * this.ratio.x}" height="${size * this.ratio.x}" fill="${color}" rx="${this.ratio.x}" />`
    }

    object(o){
          return this.rectangle(o.id, o.data)
    }
    
    set data(value){
        this.items = value
        this.canvas.innerHTML = Object.values(this.items).map(item => this.object(item) ).join('')

        this.control()
    }

    scale(w, h){
        this.ratio = {
            x: w / this.size.x,
            y: h / this.size.y
        }

        this.queryAll('.object').forEach(o => {
            let item = this.items[o.id]
            o.setAttribute('x', item.data.x * this.ratio.x)
            o.setAttribute('y', item.data.y * this.ratio.y)

            o.setAttribute('width', item.data.size * this.ratio.x)
            o.setAttribute('height', item.data.size * this.ratio.y)
        })
 
    }


}