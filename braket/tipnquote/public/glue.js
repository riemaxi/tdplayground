/** 
 * This is an simple example of a Braket architecture
 * When the user clicks on "quote" a pet related quote is requested to the network.
 * When the user clicks on "tip" a food related tip is requested to the network.
 * 
 * The response is printed back in h1 for quotes and h2 for tips
 * 
 * Obs. The Bra and Ket subclasses can't use low level methods
 * like Bra::#on or Ket::#get
 * 
 * Obs. Bra and Ket subclasses use each other public methods, hence the glue name
 **/

import Bra from "./bra.js"
import Ket from "./ket.js"

let bra = new class extends Bra{
    constructor(){
        super()
    }

    onQuote(data){
        ket.printQuote(data)
    }

    onTip(data){
        ket.printTip(data)
    }

}

//Ket component
let ket = new class extends  Ket{
    constructor(){
        super()
    }

    onQuote(data){
        bra.sendQuoteRequest(data)
    }

    onTip(data){
        bra.sendTipRequest(data)
    }
}