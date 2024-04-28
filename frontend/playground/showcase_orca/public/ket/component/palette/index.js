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
        <!--div class="menu" id="categories"></div -->
        <div class="menu" id="providers"></div>
    </div>
</div>
`

export default class Palette extends Window{
    constructor(){
        super()

        this.providers = this.get('providers')
    }

    controlProviders(){
        this.queryAll('.provider-button').forEach(b => b.onclick = () => this.onSelection('provider', this.getProvider(b.id)))
    }

    terminal(id){
        let list = this.items.links.filter(item => item.p == id)
        return list.length ? '$' : ''
    }

    showProviders(root = '-1'){
        let html = (terminal, item) => `<div class="menuitem"><div class="provider-button" id="${terminal}${item.id}">${item.data.icon}</div><div class="caption">${item.data.name}</div></div>`

        this.providers.style.display = 'flex'

        let list = this.getBranch(root, this.items)

        let back = root !== '-1' ? html('', {id: '$' + this.getParent(root), data: { icon: '&#9166;', name: ''}}) : ''
        this.providers.innerHTML = list.map(item => html(this.terminal(item.id), item)).join('') + back

        this.controlProviders()
    }

    getParent(id){
        return this.items.links.find(item => item.c == id)?.p
    }

    getProvider(id){
        let node = this.items.nodes.find(item => item.id == id.replace('$',''))
        return {node, expand: id[0] == '$'}
    }

    getBranch(root, data){
        let {nodes, links} = data
        return links.filter(item => item.p == root).map(item => nodes.find(n => n.id == item.c))
    }

    set data(value){
        let root = '-1'
        this.items = {
            nodes: value.nodes,
            links: value.links
        }

        this.showProviders(root)
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }

    onSelection(_){}
  
}