/**
 * 4 Digital Asset
 * Author: Samuel Ferrer
 * 2024-04-30
 * Ket component
 * This component focuses on the user interaction
 * It might use presentation components
 * 
  */

const MAX_TIPS = 20
const MAX_QUOTES = 20

export default class Ket{
    constructor(){
        this.#tips = MAX_TIPS
        this.#quotes = MAX_QUOTES

        this.#get('pet').onclick = () => this.#handle('quote','pets')
        this.#get('food').onclick = () => this.#handle('tip', 'food')

        this.#get('quote').innerText = `Max ${this.#quotes} quotes`
        this.#get('tip').innerText = `Max ${this.#tips} tips`
    }

    get #tips(){
        return this._tips
    }

    set #tips(value){
        this._tips = value
    }

    get #quotes(){
        return this._quotes
    }

    set #quotes(value){
        this._quotes = value
    }

    /**
     * Access a DOM element with a given id
     * @param {id} id 
     * @returns DOM element
     */
    #get(id){
        return document.getElementById(id)
    }

    /**
     * To be called by the subclass
     * @param {text} data 
     */
    printQuote(data){
        this.#quotes--                        
        this.#get('quote').innerText = `${this.#quotes} quotes left: ` + data
 
        if (this.#quotes == 1)
            this.#quotes = MAX_QUOTES + 1
    
    }

    /**
     * To be called by the subclass
     * @param {text} data 
     */
    printTip(data){
        this.#tips--
        this.#get('tip').innerText = `${this.#tips} tips left: ` +  data

        if (this.#tips == 1)
            this.#tips = MAX_TIPS + 1
    }

    #handle(id, data){
        switch(id){
            case 'tip' : this.onTip(data); break;
            case 'quote' : this.onQuote(data); break;
        }
    }

    /**
     * To be implemented at the Glue component
     */
    onTip(_){}

    /**
     * To be implemented at the Glue component
     */
    onQuote(_){}

}