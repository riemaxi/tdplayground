import Element from "./common/element.js"
import Marketplace from "./marketplace.js"

const content = `
<style>
    #root{
        display: flex;
        flex-direction: column;
        width: 100%;
        font-family: Arial;
        gap: 31px;
    }

    .item{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: black;
        color: orangered;
        height: 100px;        
    }

    .name{
        font-size: 25px;
    }

    .publishing{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .author{
        font-size: 20px;
    }

    .date{
        font-size: 15px;
    }

    .description{
        width: 100%;
        font-size: 25px;
    }

    play-marketplace{
        margin: 20px 0 20px 0;
    }

    </style>
<div id="root">
</div>
`

export default class ServiceProvider extends Element{
    constructor(){
        super(content)

        window.customElements.define('play-marketplace', Marketplace)
    }

    createList(items, handle){
        let html = (id, data) => `
              <div class="item">
                <div class="header">
                    <div class="name">${data.name}</div>
                    <div class="publishing">
                        <div class="author">${data.author}</div>
                        <div class="date">${new Date( data.date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="description">${data.description}</div>

                <play-marketplace id="${id}"></play-marketplace>
            </div>
        `

        this.get('root').innerHTML = items.map(item =>  html(item.id, item.data)).join('')

        this.queryAll('play-marketplace').forEach(mp => {
            mp.data = items.find(item => mp.id == item.id)?.data?.interfaces
            mp.handle = (id, data) => handle('marketplace', {marketplace: mp.id, command: {id, data}} )
        })
    }

    set data(value){
        this.createList(
            value,
            (id, data) =>  this.handle(id, data)
        )
    }
}