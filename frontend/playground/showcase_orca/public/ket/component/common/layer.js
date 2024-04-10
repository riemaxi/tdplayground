export default class Layer{
    constructor(root){
        this.root = root
    }

    get size(){
        return {
           width: this.root.getBoundingClientRect().width,
           height : this.root.getBoundingClientRect().height
        }
    }

    objects(cn){
        return [...this.root.children]
    }

    get(id){
        return this.objects().find(o => o.id == id)
    }
}