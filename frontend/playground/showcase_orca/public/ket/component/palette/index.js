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

#stack{
    display: flex;
    background-color: #8d7a7a;
}

.menu{
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
    <div id="stack">
        <div class="menu" id="categories"></div>
        <div class="menu" id="providers"></div>
    </div>
</div>
`

export default class Palette extends Window{
    constructor(){
        super()

        this.categories = this.get('categories')
        this.providers = this.get('providers')
    }

    controlCategories(){
        this.queryAll('.category-button').forEach(b => b.onclick = () => this.onSelection('category', b.id))
    }

    controlProviders(){
        this.queryAll('.provider-button').forEach(b => b.onclick = () => this.onSelection('provider', b.id))
    }

    showCategories(){
        let html = item => `<div class="menuitem"><div class="category-button" id="${item.id}">${item.symbol}</div><div class="caption">${item.name}</div></div>`

        this.providers.style.display = 'none'
        this.categories.style.display = 'flex'

        this.get('categories').innerHTML = this.items.categories.map(item => html(item)).join('')

        this.controlCategories()
    }

    showProviders(catId){
        let html = item => `<div class="menuitem"><div class="provider-button" id="${item.id}">${item.symbol}</div><div class="caption">${item.name}</div></div>`        


        this.categories.style.display = 'none'
        this.providers.style.display = 'flex'

        let list = this.items.providers.filter(p => p.categories.indexOf('*') >=0 || p.categories.indexOf(catId) >= 0)        
        this.providers.innerHTML = list.map(item => html(item)).join('') + html({id: 'return', symbol: '&#9166;', name: ''})

        this.controlProviders()
    }

    set data(value){
        this.items = {
            categories: Object.entries(value.categories).map(e => ({id: e[0], ...e[1]})),
            providers: Object.entries(value.providers).map(e => ({id: e[0], ...e[1]}))
        }

        this.showCategories()
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }

    onSelection(_){}
  
}