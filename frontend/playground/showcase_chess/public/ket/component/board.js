import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: #FEFAE0;
    }
</style>
<div id="root">
</div>
`

export default class Board extends Element{
    constructor(){
        super(content)

        this.control()
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