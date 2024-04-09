import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

</style>
<div id="root">
    <svg width="100%" height="100%">
        <g id="content"></g>
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

        this.content = this.get('content')
    }

    addObject(data){
        this.content.innerHTML += this.circle(data)
    }

    circle(id, data){
        let {x,y, size, color} = data
        return `<circle id="${id}" cx=${x} cy="${y}" r="${size}" fill="${color}" />`
    }

    rectangle(id, data){
        let {x,y, size, color} = data
        return `<rect id="${id}" x=${x} y="${y}" width="${size}" height="${size}" fill="${color}" rx="15" />`
    }

    object(o){
        switch(o.shape){
            case 'c' : return this.circle(o.id, o.data)
            case 'r' : return this.rectangle(o.id, o.data)
        }
    }
    
    set data(value){
        this.content.innerHTML = value.map(item => this.object(item) ).join('')
    }

    scale(w, h){
        let xs = w / this.size.x
        let ys = h / this.size.y

        this.content.setAttribute('transform', `scale(${xs} ${ys})`)
    }


}