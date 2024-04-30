export default class Bra{
    constructor(){
    }

    #send(id, data){
        fetch(`${id}/${data}`)
            .then(response => response.text() )
            .then(response => this.#on(id, response))
    }

    #on(id, data){
        switch(id){
        }
    }
}
