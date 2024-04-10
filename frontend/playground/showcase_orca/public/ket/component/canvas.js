import Element from "./common/element.js"

import ObjectLayer from "./objectlayer.js"
import LinkLayer from "./linklayer.js"
import TileLayer from "./tilelayer.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
    }

    .object{
        cursor: pointer;
    }

    .layer{
        position: absolute;
    }

</style>
<div id="root">
    <svg class="layer" id="tile-canvas" width="100%" height="100%" />
    <svg class="layer" id="link-canvas" width="100%" height="100%" />
    <svg class="layer" id="object-canvas" width="100%" height="100%" />
</div>
`

export default class Canvas extends Element{
    constructor(){
        super(content)

        this.size = {
            width: 50,
            height: 50
           }


       this.llayer = new LinkLayer(this.get('link-canvas'), this.size, {})
        this.tlayer = new TileLayer(this.get('tile-canvas'), this.size, {})
        this.olayer = new ObjectLayer(this.get('object-canvas'), this.size, {})
    }

    control(){

    }

    set data(value){
        this.olayer.data = value.items
        this.llayer.data = value.links
        this.tlayer.data = value.tiles
    }

    scale(w, h){
        let ratio = {
            x: w / this.size.width,
            y: h / this.size.height
        }

        this.olayer.scale(ratio)
        this.llayer.scale(ratio)
        this.tlayer.scale(ratio)
    }


}