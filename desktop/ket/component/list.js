import Element from "./common/element.js"

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

    .commands{
        display: flex;
        width: 100%;
        height: 40px;
        gap: 100px;
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
</style>
<div id="root">
</div>
`
/**
 * item
 * name
 * author's name
 * date
 * description
 * link
 */

export default class List extends Element{
    constructor(){
        super(content)
    }

    createList(items, handle){
        let html = item => `
            <div class="item">
                <div class="header">
                    <div class="name">${item.name}</div>
                    <div class="publishing">
                        <div class="author">${item.author}</div>
                        <div class="date">${new Date( item.date).toLocaleDateString()}</div>
                    </div>
                </div>

                <div class="description">${item.description}</div>

                <div class="commands">
                    <div class="command"><img class="play" data-id="${item.id}" src="./img/goplay.png"></div>
                    <div class="command"><img class="repo" data-id="${item.id}" src="./img/repo.png"></div>
                </div>
                
            </div>
        `

        this.get('root').innerHTML = items.map(item => html(item)).join('')

        this.queryAll('.play').forEach(b => b.onclick = () => handle('play', b.dataset.id))
        this.queryAll('.repo').forEach(b => b.onclick = () => handle('repo', b.dataset.id))

    }

    set data(value){
        this.createList(
            value,
            (id, data) =>  this.handle(id, data)
        )
    }
}