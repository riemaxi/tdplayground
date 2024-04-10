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


       this.llayer = new LinkLayer(this.get('link-canvas'), this.size, [])
        this.tlayer = new TileLayer(this.get('tile-canvas'), this.size, {})
        this.olayer = new ObjectLayer(this.get('object-canvas'), this.size, {})
    }

    control(){
        this.olayer.onChange = item => {
            this.llayer.updateObject(item)
        }
    }

    createLinks(links, objects){
        Object.values(links).forEach(link => {
            let oa = objects[link.feature.a].data
            let ob = objects[link.feature.b].data
            link.state = {
                a: {
                    x: oa.state.x + oa.feature.size / 2,
                    y: oa.state.y + oa.feature.size / 2
                },
                b: {
                    x: ob.state.x + ob.feature.size / 2,
                    y: ob.state.y  + ob.feature.size / 2
                }
            }
        })

        return links
    }

    set data(value){
        this.olayer.data = value.objects

        this.llayer.data = this.createLinks(value.links, value.objects)

        this.tlayer.data = value.tiles

        this.control()
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