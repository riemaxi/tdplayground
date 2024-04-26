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

    controlObject(o){
        o.onpointerdown = e => {
            if (this.tool == 'cut'){
                o.remove()                    
                this.onRemoval(o)                    
                return
            }

           this.selectObject(o)

           this.current = o
            this.delta = {
                x: e.offsetX - o.getAttribute('x'),
                y: e.offsetY - o.getAttribute('y')
            }

            this.onSelection(this.items[this.current.id])

            if (this.tool == 'link'){
                this.addLinker(o.getAttribute('x'), o.getAttribute('y'))
            }
        }

        o.onpointerup = e => {
            if (this.tool == 'link'){
                this.onLink(this.items[this.current.id], this.items[this.currentEnd.id])
                this.resetLinker()
                this.currentEnd = null
            }

            this.current = null
            this.delta = null
        }

        o.onpointermove = e => {
            if (this.tool == 'link'){
                this.currentEnd = o
            }
        }
    }

    controlRoot(){
        this.root.onpointerup = e => {
            console.log('tool', this.tool)
            if (this.tool == 'link'){
                this.resetLinker()
            }

            this.current = null
        }

        this.root.onpointermove = e => {
            if (!this.current)
            return 

            let r = this.root.getBoundingClientRect()

            let x = e.clientX - r.x - this.delta.x
            let y = e.clientY - r.y - this.delta.y


            if (this.tool == 'link')
                this.stearLinker(x, y)
            else
                this.moveObject(x, y)
        }

    }

    control(){
        this.objects('object').forEach(o => this.controlObject(o))
        this.controlRoot()
    }

    moveObject(x, y){
        this.current.setAttribute('x', x)
        this.current.setAttribute('y', y)

        let item = this.items[this.current.id]
        item.data.state.x = x / this.ratio.x
        item.data.state.y = y / this.ratio.y

        this.onChange(item)
    }

    addLinker(x,y){
        this.root.innerHTML += `<line id="linker" x1="${x}" y1="${y}"  x2="${x}" y2="${y}" stroke="red" stroke-width="1" />`
        this.linker = this.get('linker')

        this.control()
    }

    resetLinker(){
        this.get('linker')?.remove()
    }


    stearLinker(x, y){
        this.linker.setAttribute('x2', x)
        this.linker.setAttribute('y2', y)

        this.linker.remove()
        this.root.appendChild(this.linker)
    }

    addObject(color, x, y, extra){
        let size = 2
        let object = {
            id : Date.now(),
            data: {
                feature: {
                    color,
                    size,
                    extra
                },
                state: {
                    x : x / this.ratio.x - size/2,
                    y : y / this.ratio.y - size/2
                }
            }
        }

        this.items[object.id] = object

        this.root.innerHTML += this.object(object)
        this.control()

        this.onSelection(object)
    }

    selectObject(o){
        o.remove()
        this.root.appendChild(o)
    }

    icon(id, data){
        let {state, feature} = data
        let {x,y } = state
        let {color, size, extra} = feature

        return `<text class="object" id="${id}" x=${x * this.ratio.x} y="${y *  this.ratio.y}">${extra.feature.symbol}</text>`
    }

    rectangle(id, data){
        let {state, feature} = data
        let {x,y } = state
        let {color, size} = feature

        return `<rect class="object" id="${id}" x=${x * this.ratio.x} y="${y *  this.ratio.y}" width="${size * this.ratio.x}" height="${size * this.ratio.y}" fill="${color}" rx="${this.ratio.x}" />`
    }

    object(o){
        return this.icon(o.id, o.data)
    }  
    
    get data(){
        return this.items
    }

    set data(value){
        this.items = value
    }

    update(){
         this.root.innerHTML += Object.values(this.items).map(item => this.object(item) ).join('')
    }

    scale(ratio){
        this.ratio = ratio

        this.objects('object').forEach(o => {
            let item = this.items[o.id]
            let {feature, state} = item.data

            o.setAttribute('x', state.x * this.ratio.x)
            o.setAttribute('y', state.y * this.ratio.y)

            o.setAttribute('width', feature.size * this.ratio.x)
            o.setAttribute('height', feature.size * this.ratio.y)
            o.setAttribute('rx', this.ratio.x)
         })        
    }

    reset(){
        super.reset('object')
     }


    onChange(_){}
    onSelection(_){}
    onRemoval(_){}
    onLink(_){}
}