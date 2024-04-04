import {
    FrameHandler
} from './component/index.js'
import State from './state.js'

let state = new State()

let frame = document.getElementById('frame')

export default class Ket{
    constructor(){
        frame.handle = (id, data) => this.handleUser(id, data)
        
        this.registerComponents()
    }

    registerComponents(){
        window.customElements.define('playground-frame', FrameHandler)
    }

    init(data){
        console.log('init', data)       
    }

    handleUser(id, data){
        console.log('handle user', id, data)
    }

    handlePublisher(id, data){
        console.log('handle publisher', data)
    }

    handleSP(id, data){
        console.log('handle SP', id, data)
    }

    update(id, data){
        switch(id){
            //SP Publisher
            case 'added': this.handlePublisher('added', data); break;
            case 'removed': this.handlePublisher('removed', data); break;
            case 'updated': this.handlePublisher('updated', data); break;
            case 'list': this.handlePublisher('list', data); break;

            //SP
            case 'req' : this.handleSP('req',  data); break;
            case 'res' : this.handleSP('res',  data); break;
            case 'trn' : this.handleSP('trn',  data); break;
            case 'ack' : this.handleSP('ack',  data); break;
            case 'stm' : this.handleSP('stm',  data); break;
        }
    }

    on(id, data){}
}