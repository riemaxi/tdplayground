import Layer from "./common/layer.js"

export default class LinkLayer extends Layer{
    constructor(root, gridsize, data){
        super(root)

        this.ratio = {
            x: this.size.width / gridsize.width,
            y: this.size.height / gridsize.height
        }
        this.data = data

    }

    scale(ratio){
        this.ratio = ratio
    }
}