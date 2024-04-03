import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        flex-direction: column;
        width: 100%;
        font-family: Arial;
        gap: 20px;
    }

    .item{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .commands{
        display: flex;
        width: 100%;
        height: 40px;
        gap: 20px;
    }

    .command{
        display: flex;
        width: 40px;
        height: 100%;
    }

    .command img{
        height: 100%;
        cursor: pointer;
    }    

    .publishing{
        display: flex;
        flex-direction: column;
        background: gray;
        color: white;
        gap: 10px;
    }

    .name{
        font-family: Arial;
        font-size: 20px;
    }

    .date{
        font-family: Arial;
        font-size: 15px;
    }
</style>
<div id="root">
</div>
`

export default class Marketplace extends Element{
    constructor(){
        super(content)
    }

    createList(items, handle){
        let html = item => `
        <div class="item">
            <div class="publishing">
                <div class="name">${item.name}</div>
                <div class="date">${new Date(item.date).toLocaleDateString()}</div>
            </div>
            <div class="commands">
                <div class="command"><img class="play" data-id="${item.id}" src="./img/goplay.png"></div>
                <div class="command"><img class="repo" data-id="${item.id}" src="./img/repo.png"></div>
                <div class="command"><img class="youtube" data-id="${item.id}" src="./img/youtube.webp"></div>
                <div class="command"><img class="instagram" data-id="${item.id}" src="./img/instagram.webp"></div>
            </div>
        </div>`

        this.get('root').innerHTML = items.map(item => html(item)).join('')

        this.queryAll('.command img').forEach(c => c.onclick = () => this.handle(c.className, c.dataset.id))
    }

    set data(value){
        this.createList(
            value,
            (id, data) => this.handle(id, data)
        )
    }
}