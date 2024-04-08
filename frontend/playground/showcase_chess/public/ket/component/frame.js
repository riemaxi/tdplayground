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
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        height: 100%;
        margin: auto;
    }

    #session{
        height: 100px;
    }

    #toolbar{
        _height: 100%;
    }

    #board{
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
        this.toolbar = this.get('toolbar')

        window.onresize = () => this.onResize(this.size)
        window.ondeviceorientation = () => this.onResize(this.size)

        this.board.onMove = e => console.log('move', e)
        this.toolbar.onRotate = id => this.board.rotate(id)
    }

    get session(){
        return this.get('session')
    }

    set data(value){
        this.board.data = value.board
        this.board.show()
    }

    onResize(size){
        if (!this.board.data)
            return

        if (size.width > size.height){
            this.content.style.width = size.height + 'px'
        }
        else{
            this.content.style.height = size.width + 'px'
        }

        this.board.show()

    }
}