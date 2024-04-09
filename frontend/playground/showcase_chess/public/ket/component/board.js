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

        this.role = 'w'
        
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
        this.controlCells()
        this.controlSymbols()
    }

    controlCells(){
        let cells = this.queryAll('.cell')
        cells.forEach(cell => cell.onclick = () => this.handleCell(cell))
    }

    controlSymbols(){
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

    set configuration(value){
        this.current = null
        this.queryAll('.symbol').forEach(s => s.remove())
        this.buildPieces(value)

        this.control()
    }

    get configuration(){
        return this.queryAll('.symbol').map(s => s.id)
    }

    set piece(value){
        console.log('board piece', value)
    }

    set data(value){
    }

    get data(){
        return this.configuration ? {
            configuration: this.configuration
         }: null
    }

    handleSymbol(symbol){
        let name = symbol.id.split('-')[0]
        console.log('name', name, this.role)

        if (!this.role)
            return


        if (this.role === 'both' || this.role === name[0]){

            if (this.current){
                this.current.style.fontWeight = ''
            }

            this.current = symbol 
            this.current.style.fontWeight = 'bold'

            this.onSymbol(symbol.id)
        }
    }

    handleCell(cell){
        if (this.current){
            let vector = this.current.id.split('-')
            let name = vector[0]

            let position = cell.id.split('-').map(v => parseInt(v))

            this.current.setAttribute('x', position[0] + .2)
            this.current.setAttribute('y', position[1] + .8)
            this.current.style.fontWeight = ''

            this.current.id = `${name}-${position[0]}-${position[1]}`    
            
            this.onMove({piece: vector.join('-') , position })

            this.current = null
        }
    }

    rotate(id){
        let deg = id === '0' ? '0deg' : '180deg'

        this.board.style.transform = `rotate(${deg})`
        this.queryAll('.symbol').forEach(s => s.style.transform = `rotate(${deg})`)
    }

    move(id, position){
        let name = id.split('-')[0]
        let piece = this.get(id)

        piece.setAttribute('x', position[0] + .2)
        piece.setAttribute('y', position[1] + .8)

        piece.id = `${name}-${position[1]}-${position[0]}`    
   
    }

    onSymbol(_){}    
    onMove(_){}
}