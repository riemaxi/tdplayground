import Layer from "../common/layer.js"

export default class ObjectLayer extends Layer { 
    constructor(root, gridsize, data){
        super(root)

        this.ratio = {
            x: this.size.width / gridsize.width,
            y: this.size.height / gridsize.height
        }
        this.data = data
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
            item.data.state.x = x / this.ratio.x
            item.data.state.y = y / this.ratio.y

            this.onChange(item)
        }

    }

    selectObject(o){
        o.remove()
        this.root.appendChild(o)
    }


    rectangle(id, data){
        let {state, feature} = data
        let {x,y } = state
        let {color, size} = feature

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
            let {feature, state} = item.data

            o.setAttribute('x', state.x * this.ratio.x)
            o.setAttribute('y', state.y * this.ratio.y)

            o.setAttribute('width', feature.size * this.ratio.x)
            o.setAttribute('height', feature.size * this.ratio.y)
            o.setAttribute('rx', this.ratio.x)
         })        
    }

    onChange(_){}
}