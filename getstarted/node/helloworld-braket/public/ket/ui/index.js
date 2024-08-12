import Message from "./message.js"

export default class UI{
    constructor(){
        this.message = this.get('message')

        this.control()
    }

    control(){
        this.message.onRequest = data => this.onRequest('hello', data)
    }

    get(id){
        return document.getElementById(id)
    }

    set data(value){
        this.message.data = value
    }

    onRequest(_){}
}