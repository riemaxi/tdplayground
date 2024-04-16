import Window from "../common/window.js"

const STYLE = `
#content{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: white;
    color: white;
}

#title{
    display: flex;
    height: 50px;
    width: 100%;
    background-color: black;
    align-items: center;
    font-family: Impact;
}

#command{
    display: flex;
    gap: 5px;
    justify-content: right;
    height: 30px;
}

.button{
    color: black;
    cursor: pointer;
}

#sections{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: Arial;
    width: 100%;
    height: 100%;
}

#sections div{
    display: flex;
}

.section{
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid black;
}

.section div{
    display: flex;
}

.section-title{
    color: white;
    background-color: gray;
}

`

const STRUCTURE = `
<div id="content">
    <div id="title"><div>Property</div></div>
    <div id="command">
        <div class="button" id="play">&#9205;</div>
        <div class="button" id="pause">&#9208;</div>
        <div class="button" id="stop">&#9209;</div>
        <div class="button" id="sync">&#128257;</div>
    </div>
    <div id="sections">
        <div class="section">
            <div class="section-title">feature</div>
            <div id="feature"></div>
        </div>
        <div class="section">
            <div class="section-title">setting</div>
            <div id="setting"></div>
        </div>
        <div class="section">
            <div class="section-title">state</div>
            <div id="state"></div>
        </div>
    </div>
</div>
`

export default class Property extends Window{
    constructor(){
        super(true)
    }

    get customStructure(){
        return STRUCTURE
    }

    get customStyle(){
        return STYLE
    }
    
    set data(value){
        this.get('title').innerText = `Properties - ${value.feature.name}`
    }
}