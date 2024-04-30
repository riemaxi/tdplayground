/**
 * Bra component.
 * This the only access to the backend (the network)
 */

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
            case 'tip' : this.onTip(data); break;
            case 'quote': this.onQuote(data); break;
        }
    }

    sendQuoteRequest(data){
        this.#send('quote', data)
    }

    sendTipRequest(data){
        this.#send('tip', data)
    }

    onQuote(_){}
    onTip(_){}
}
