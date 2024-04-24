const STYLE = `
<style>
    #root{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: #8d7a7a;
        color: white;
        font-family: Arial;
    }

    #header{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 20px;
        font-weight: bold;
    }

    .header-cell{
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }

    #footer{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 20px;
    }

    .footer-cell{
        display: flex;
        justify-content: space-between;
    }

    #items{
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    .row{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 20px;
        cursor: pointer;
        border-bottom: 1px solid black;
    }

    .row-cell{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
`
const STRUCTURE = `
<div id="root">
    <div id="header"></div>
    <div id="items"></div>
    <div id="footer"></div>
</div>
`
export default class List extends HTMLElement{
    constructor(content){
        super()

        this.shadow = this.attachShadow({mode:"open"})

        let template = document.createElement('template')
        template.innerHTML = STYLE + STRUCTURE
        this.shadow.appendChild(template.content.cloneNode(true))

        this.control()
    }

    get(id){
        return this.shadow.getElementById(id)
    }

    queryAll(exp){
        return [...this.shadow.querySelectorAll(exp)]
    }

    get header(){
        return this.get('header')
    }

    get items(){
        return this.get('items')
    }

    get footer(){
        return this.get('footer')
    }

    control(){
        this.queryAll('.header-cell').forEach(c => c.onclick = () => this.onHeader(c.id, c.innerText))

        this.queryAll('.row-cell').forEach(c => c.onclick = () => this.onCell(c.id, c.innerText) )
    }

    set data(value){
        this.renderHeader(value.header)
        this.renderItems(value.items)
        this.renderFooter(value.footer)
    }

    renderHeader(data){
        let html = (col, data) => {
            return `<div id="header"><div id="h-${col}" class="header-cell">${data}</div></div>`
        }

        this.header.innerHTML = data.map((data, col) => html(col, data)).join('')
    }

    renderItems(data){
        let cell = (r, c, data) => {
            return `<div class="row"><div id="${r}-${c}" class="row-cell">${data}</div></div>`
        }

        let row = (r, data) => {
            return `<div class="row">${data.map((data, c) =>  cell(r,c, data)).join('')}</div>`
        }

        this.items.innerHTML = data.map((data, i) => row(i, data)).join('')
    }

    renderFooter(data){
        let html = (col, data) => {
            return `<div id="footer"><div id="f-${col}" class="footer-cell">${data}</div></div>`
        }

        this.footer.innerHTML = data.map((data, col) => html(col, data)).join('')
    }

    onHeader(_){}
    onCell(_){}
}

window.customElements.define('common-list', List)