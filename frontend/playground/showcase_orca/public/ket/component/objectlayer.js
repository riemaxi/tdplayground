import Layer from "./common/layer.js"

export default class ObjectLayer extends Layer { 
    constructor(root, gridsize, items){
        super(root)

        this.ratio = {
            x: this.size.width / gridsize.width,
            y: this.size.height / gridsize.height
        }
        this.data = items
    }

    control(){
        this.objects().forEach(o => {
            o.onpointerdown = e => {
                this.selectObject(o)

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

        this.root.onpointermove = e => {
            if (!this.current)
            return 

            let r = this.root.getBoundingClientRect()

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
        this.root.appendChild(o)
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
        this.root.innerHTML = Object.values(this.items).map(item => this.object(item) ).join('')

        this.control()
    }

    scale(ratio){
        this.ratio = ratio

        this.objects().forEach(o => {
            let item = this.items[o.id]
            o.setAttribute('x', item.data.x * this.ratio.x)
            o.setAttribute('y', item.data.y * this.ratio.y)

            o.setAttribute('width', item.data.size * this.ratio.x)
            o.setAttribute('height', item.data.size * this.ratio.y)
            o.setAttribute('rx', this.ratio.x)
        })        
    }

}