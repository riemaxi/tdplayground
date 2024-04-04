import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    #content{
        display: flex;
        width: 100%;
        flex-direction: column;
    }

</style>
<div id="root">
    <div id="content"></div>
</div>
`

export default class Frame extends Element{
    constructor(){
        super(content)

        this.control()
    }

    control(){
    }

    set data(value){
        this.get('content').innerHTML = value
    }
}