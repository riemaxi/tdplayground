import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

</style>
<div id="root">
    <svg width="100%" height="100%">
        <g id="content">
            <circle cx="10" cy="19" r="1" fill="blue" />
        </g>
    </svg>  
</div>
`

export default class Canvas extends Element{
    constructor(){
        super(content)

        this.size = {
            x: 50,
            y: 50
        }
    }

    scale(w, h){
        let xs = w / this.size.x
        let ys = h / this.size.y

        this.get('content').setAttribute('transform', `scale(${xs} ${ys})`)
    }


}