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

        transform-box: fill-box;
        transform-origin: center;
        transform: rotate(0deg);        
    }

    .symbol{
        font-size: .04em;
        color: white;
        border: 1px solid red;
        cursor: grab;

        transform-box: fill-box;
        transform-origin: center;
        transform: rotate(0deg);        
    }

    .cell{
        cursor: pointer;
    }

    #canvas{
        width: 100%;
        height: 100%;

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
    }

    get board(){
        return this.get('board')
    }

    get canvas(){
        return this.get('canvas')
    }

    cell(r,c){
        let color = (r % 2 && !(c % 2)) || (c % 2 && !(r % 2)) ? '#8DD06C' : 'white'
        return `<rect class="cell" id="${c}-${r}" x="${c}" y="${r}" width="1" height="1" fill="${color}"/>`
    }

    draw(data){
        this.scale = {
            x: this.board.getBoundingClientRect().width / 8,
            y : this.board.getBoundingClientRect().height / 8
        }
  
        this.canvas ? this.rescale() : this.build(data.configuration)

        this.control()
    }

    build(configuration){
        let grid = [...Array(8)].map((_, r) => [...Array(8)].map((_,c) => 0 ))
        this.board.innerHTML = `<g id="canvas" transform="scale(${this.scale.x},${this.scale.y})">` +  grid.map((r,i)  => r.map((c,j) => this.cell(i,j)).join('') ).join('') + '</g>'

        this.buildPieces(configuration)
    }

    rescale(){
        this.canvas.setAttribute('transform', `scale(${this.scale.x},${this.scale.y})`)
    }

    control(){
        let cells = this.queryAll('.cell')
        cells.forEach(cell => cell.onclick = () => this.handleCell(cell))

        let symbols = this.queryAll('.symbol')
        symbols.forEach(symbol => symbol.onclick = () => this.handleSymbol(symbol) )
    }

    buildPieces(configuration){
        let symbol = {  'br':'♜',bn:'♞',bb:'♝',bk:'♚',bq:'♛',bp:'♟', 
                        'wr':'♖',wn:'♘',wb:'♗',wk:'♔',wq:'♕',wp:'♙' }

        let piece = (id, c, r) => {
            if (id == '')
                return ''

            let vector = id.split('-')
            let shape = symbol[vector[0]]
            return `<text id="${id}" x="${c + .2}"  y="${r + .8}" class="symbol">${shape}</text>`
        }

        let svgcontent = configuration.map((row, i) => row.map((id, j) => piece(id, j,i)).join('') ).join('')
        this.canvas.innerHTML += svgcontent

    }

    set utility(value){
        console.log('board utility', value)
    }

    set piece(value){
        console.log('board piece', value)
    }

    set data(value){
        /*let {configuration} = value
        this.configuration = configuration*/
    }

    get data(){
        return this.configuration ? {
            configuration: this.configuration
         }: null
    }

    handleSymbol(symbol){
        if (this.current){
            this.current.style.fontWeight = ''
        }

        this.current = symbol 
        this.current.style.fontWeight = 'bold'

        this.onSymbol(symbol.id)
    }

    handleCell(cell){
        if (this.current){
            let vector = this.current.id.split('-')
            let name = vector[0]
            let oldPosition = vector.slice(1).map(v => parseInt(v))
            let position = cell.id.split('-').map(v => parseInt(v))

            this.current.setAttribute('x', position[0] + .2)
            this.current.setAttribute('y', position[1] + .8)
            this.current.style.fontWeight = ''

            this.current.id = `${name}-${position[0]}-${position[1]}`            
            //this.configuration[position[1]][position[0]] = name
            //this.configuration[oldPosition[1]][oldPosition[0]] = ''

            this.onMove({piece: name, oldPosition, position, configuration: this.configuration })

            this.current = null
        }
    }

    rotate(id){
        let deg = id === '0' ? '0deg' : '180deg'

        this.board.style.transform = `rotate(${deg})`
        this.queryAll('.symbol').forEach(s => s.style.transform = `rotate(${deg})`)
    }

    onSymbol(_){}    
    onMove(_){}
}