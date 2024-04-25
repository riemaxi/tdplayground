import Window from "../common/window";

const STYLE = `
#content{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 0 0 4px 4px;
    background-color: black;
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
`

const STRUCTURE = `
<div id="content">
    <div id="title"><div>Marketplace Studio</div></div>
</div>`

export default class Studio extends Window{
    constructor(){
        super(true)
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }

    get minHeight(){
        return 200
    }
}