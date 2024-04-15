import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        border-radius: inherit;        
    }

    #content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        width: 100%;
        height: 100%;
        background-color: black;
        color: white;
        border-radius: inherit;
        gap: 5px;
    }
    
    #name{
        display: flex;
        justify-content:  center;
        font-size: 20px;
    }

    #role{
        display: flex;
        justify-content:  center;
        font-size: 10px;
    }    
</style>
<div id="root">
    <div id="content">
        <div id="name"></div>
        <div id="role"></div>
    </div>
</div>
`

export default class Badge extends Element{
    constructor(){
        super(content)
    }

    set data(value){
        this.get('name').innerText = value.name
        this.get('role').innerText = value.role
    }
}