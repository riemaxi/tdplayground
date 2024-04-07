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
        margin: auto;
    }
</style>
<div id="root">
    <svg id="board" width="100%" height="100%">
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

    square(r,c){
        let color = (r % 2 && !(c % 2)) || (c % 2 && !(r % 2)) ? 'green' : 'white'
        return `<rect x="${c}" y="${r}" width="1" height="1" fill="${color}"/>`
    }

    show(height){
        let board = this.get('board')

        if (height)
            board.style.height = height + 'px'

        let grid = [...Array(8)].map((_, r) => [...Array(8)].map((_,c) => 0 ))

        this.scale = {
            x: this.board.getBoundingClientRect().width / 8,
            y : this.board.getBoundingClientRect().height / 8
        }

        board.innerHTML = `<g transform="scale(${this.scale.x},${this.scale.y})">` +  grid.map((r,i)  => r.map((c,j) => this.square(i,j))).join('') + '</g>'
    }

    control(){

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
        let {backgraound, pieces, piece} = value
        console.log('board data', backgraound, pieces, piece)
    }
}