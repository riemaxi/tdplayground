import Element from "./common/element.js"

import Session from "./session.js"
import Board from "./board.js"
import Toolbar from "./toolbar.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #content{
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        width: 100%;
        height: 100%;
    }

    #session{
        _width: 30%;
        height: 100%;
    }

    #toolbar{
        _width: 30%;
        height: 100%;
    }

    #board{
        _width: 40%;
        height: 100%;
    }
</style>
<div id="root">
    <div id="content">
        <frame-session id="session"></frame-session>
        <frame-board id="board"></frame-board>
        <frame-toolbar id="toolbar"></frame-toolbar>
    </div>
</div>
`

/**
 tool
 - create
 - remove
 - get
 - copy
 - paste
 
session
  game id
  messaging: write, send, history, latest
  timer
  
 board:
    background
	pieces
	selected  piece
	
 state:
	game id
   oponent
   role
   configuration
   time
 */

export default class Frame extends Element{
    constructor(){
        super(content)

        this.registerComponents()

        this.control()
    }

    registerComponents(){
        window.customElements.define('frame-board', Board)
        window.customElements.define('frame-session', Session)
        window.customElements.define('frame-toolbar', Toolbar)
    }

    get size(){
        let r = this.root.getBoundingClientRect()
        return {width: r.width, height: r.height}
    }

    control(){
        this.root = this.get('root')
        this.content = this.get('content')
        this.board = this.get('board')

        window.onresize = () => this.onResize(this.size)
        window.ondeviceorientation = () => this.onResize(this.size)

        this.board.onMove = e => console.log('move', e)
    }

    set data(value){
        this.board.data = value.board
        this.board.show()
    }

    onResize(size){
        if (!this.board.data)
            return

        if (size.width > size.height){
            this.content.style.gridTemplateRows = '1fr'
            this.content.style.gridTemplateColumns = '1fr 2fr 1fr'

            this.board.show(.4 * size.width)
        }
        else{
            this.content.style.gridTemplateColumns = '1fr'
            this.content.style.gridTemplateRows = '1fr 2fr 1fr'

            this.board.show(size.width)
        }


    }
}