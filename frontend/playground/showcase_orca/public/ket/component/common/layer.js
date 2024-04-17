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
        let list = [...this.root.children]
        return cn ? list.filter(item => item.getAttribute('class') == cn) : list
    }

    get(id){
        return this.objects().find(o => o.id == id)
    }
}