export default class Element extends  HTMLElement{
    constructor(content){
        super()

        const template = document.createElement('template')
        template.innerHTML = content

        this.shadow = this.attachShadow({mode:"open"})
        this.shadow.appendChild(template.content.cloneNode(true))
    }

    get(id){
        return  this.shadow.getElementById(id)
    }

    set visible(value){
        this.style.display = value ? 'flex' : 'none'
    }

    show(){
        this.visible = true
    }

    hide(){
        this.visible = false
    }

    handle(id, data){}
}