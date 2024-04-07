import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: #FEFAE0;
    }

    #board{
        width: 100%;
        height: 100%;
        margin: auto;
    }
</style>
<div id="root">
    <svg id="board">
    </svg>
</div>
`

export default class Board extends Element{
    constructor(){
        super(content)

        this.control()

        this.show()
    }

    get board(){
        return this.get('board')
    }

    cell(r,c){
        let color = (r % 2 && !(c % 2)) || (c % 2 && !(r % 2)) ? 'green' : 'white'
        return `<rect class="cell" id="${c}-${r}" x="${c}" y="${r}" width="1" height="1" fill="${color}"/>`
    }

    show(height){
        if (height)
            this.board.style.height = height + 'px'

        this.scale = {
            x: this.board.getBoundingClientRect().width / 8,
            y : this.board.getBoundingClientRect().height / 8
        }
  
        this.board.innerHTML.trim() && this.rescale() ||  this.build()

        this.control()
    }

    build(){
        let grid = [...Array(8)].map((_, r) => [...Array(8)].map((_,c) => 0 ))
        this.board.innerHTML = `<g id="canvas" transform="scale(${this.scale.x},${this.scale.y})">` +  grid.map((r,i)  => r.map((c,j) => this.cell(i,j))).join('') + '</g>'
    }

    rescale(){
        let canvas = this.get('canvas')
        canvas.setAttribute('transform', `scale(${this.scale.x},${this.scale.y})`)
       
    }

    control(){
        let cells = this.queryAll('.cell')
        cells.forEach(cell => cell.onclick = () => console.log(cell.id))
    }


    set pieces(value){
        console.log('board pieces', value)
    }

    set utility(value){
        console.log('board utility', value)
    }

    set piece(value){
        console.log('board piece', value)
    }

    set data(value){
        let {configuration, pieces} = value

        let canvas = this.get('canvas')
        let place = (id, c, r) => {
            if (id !== ''){
                let template = document.createElement('template')
                template.innerHTML = pieces[id]?.replace('X', c)?.replace('Y', r)
                canvas.appendChild(template.content.cloneNode(true))
            }
        }

        configuration.forEach((row,i) => row.forEach((id,j) => place(id, j, i) ))

    }
}