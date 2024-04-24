import Window from "../common/window.js"
import List from "../common/list.js"

const STYLE = `
#content{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 0 0 4px 4px;
}

#title{
    display: flex;
    height: 50px;
    min-height: 50px;
    width: 100%;
    background-color: black;
    align-items: center;
    font-family: Impact;        
    color: white;
}

#title div{
    margin-left: 5px;
}

#list{
    display: flex;
    height: 200px;
}
`

const STRUCTURE = `
<div id="content">
    <div id="title"><div>Repository</div></div>
    <common-list id="list"></common-list>
</div>
`

const test_data = {
    header: ['type', 'name'],
    items: [...Array(40)].map((_, r) => [...Array(2)].map((_,c) => `${r}-${c}`)),
    footer: []
}

export default class Assistant extends Window{
    constructor(){
        super(true)

        this.get('list').data = test_data
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }

    get minHeight(){
        return 250
    }
}