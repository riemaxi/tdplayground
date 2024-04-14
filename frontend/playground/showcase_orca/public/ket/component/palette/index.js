import Window from "../common/window.js"

const STYLE = `
#content{
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
    height: 100%;
    color: white;
    font-family: Impact;
}

#title{
    display: flex;
    height: 50px;
    width: 100%;
    background-color: black;
    align-items: center;
}

#title div{
    margin-left: 5px;
}

.menu{
    position: absolute;
    display: none;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    background-color: #8d7a7a;
    color: white;
    font-family: Impact;
    gap: 20px;
    margin: 0 5px 0 5px;
}

.menuitem{
    display: flex;
    flex-direction: column;
    height: 40px;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.caption{
    font-family: Arial;
    font-size: 10px;
}

.provider-button, .category-button{
    cursor: pointer;
}

#categories{
    display: flex;
}
`

const STRUCTURE = `
<div id="content">
    <div id="title"><div>Palette</div></div>
    <div class="menu" id="categories"></div>
    <div class="manu" id="providers"></div>
</div>
`

export default class Palette extends Window{
    constructor(){
        super(true)
    }

    controlCategories(){
        this.queryAll('.category-button').forEach(b => b.onclick = () => this.onSelection('category', b.id))
    }

    controlProviders(){
        this.queryAll('.category-button').forEach(b => b.onclick = () => this.onSelection('provider', b.id))
    }

    showCategories(list){
        let html = item => `<div class="menuitem"><div class="category-button" id="${item.id}">${item.symbol}</div><div class="caption">${item.name}</div></div>`
        this.get('categories').innerHTML = list.map(item => html(item)).join('')

        this.controlCategories()
    }

    showProviders(list){
        let html = item => `<div class="menuitem"><div class="provider-button" id="${item.id}">${item.symbol}</div><div class="caption">${item.name}</div></div>`
        this.get('providers').innerHTML = list.map(item => html(item)).join('') + html({id: 'return', symbol: '&#9166;', name: ''})

        this.controlProviders()
    }

    set data(value){
        this.showCategories(value.createCategories)
        //this.showProviders(value.providers)
    }

    set category(id){
        console.log('set category', id)
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }

    onSelection(_){}
  
}