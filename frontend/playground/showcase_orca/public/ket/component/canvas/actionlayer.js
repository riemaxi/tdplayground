import Layer from "../common/layer.js"

export default class ActionLayer extends Layer{
    constructor(root, gridsize, data){
        super(root)

        this.control()
    }

    control(){
        this.root.onpointerdown = e => {
            console.log('a down')
        }
    }
}