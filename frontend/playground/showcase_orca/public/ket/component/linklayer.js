import Layer from "./common/layer.js"

export default class LinkLayer extends Layer{
    constructor(root, gridsize, data){
        super(root)

        this.ratio = {
            x: this.size.width / gridsize.width,
            y: this.size.height / gridsize.height
        }
        this.data = data

    }

    object(id, state){
        let {a, b} = state

        let x1 = a.x * this.ratio.x
        let y1 = a.y * this.ratio.y
        let x2 = b.x * this.ratio.x
        let y2 = b.y * this.ratio.y

        return `<line id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" />`
    }

    set data(value){
        this.items = value
        this.root.innerHTML = Object.values(this.items).map(item => this.object(item.id, item.state) ).join('')
    }

    scale(ratio){
        this.ratio = ratio

        this.objects().forEach(o => {
            let item = this.items[o.id]

            o.setAttribute('x1', item.state.a.x * ratio.x)
            o.setAttribute('y1', item.state.a.y * ratio.y)

            o.setAttribute('x2', item.state.b.x  * ratio.x)
            o.setAttribute('y2', item.state.b.y * ratio.y)

        })
    }

    updateLink(object){
        let linkItems =  Object.values(this.items).filter(l => {
            let end = l.id.split('-')
            return end[0] == object.id || end[1] == object.id
        })

        for(let linkItem of linkItems){
            let link = this.get(linkItem.id)

            let end = linkItem.id.split('-')[0] == object.id ? {coord:1, o: linkItem.state.a} : {coord: 2, o: linkItem.state.b}
            this.updateEnd(end.o, end.coord, link, object.data)
        }
     }

     updateEnd(o, coord, link, data){
        o.x = data.state.x + data.feature.size/2
        o.y = data.state.y + data.feature.size/2
        
        link.setAttribute('x' + coord, o.x * this.ratio.x)
        link.setAttribute('y' + coord, o.y * this.ratio.y)
     }
}