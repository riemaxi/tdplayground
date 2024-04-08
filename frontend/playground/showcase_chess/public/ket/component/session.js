import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        background-color: #283618;
    }
</style>
<div id="root">
</div>
`

export default class Session extends Element{
    constructor(){
        super(content)

        this.registerComponents()

        this.control()
    }

    control(){

    }

    registerComponents(){
    }


     set data(value){
        console.log('session data', value)
    }
}