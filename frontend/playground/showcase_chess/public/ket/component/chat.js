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

export default class Chat extends Element{
    constructor(){
        super(content)

        this.control()
    }

    control(){

    }

     set data(value){
        console.log('session data', value)
    }
}