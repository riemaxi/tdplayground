import Element from './common/element.js'

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;

        background-color: #3e2b03;
    }

    #bars{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .bar{
        width: 100%;
        height: 50px;
    }

</style>
<div id="root">
    <div id="bars">
        <svg id="reservoir" class="bar">
            <rect width="100%" height="100%" fill="red"/>
        </svg>

        <svg id="tank" class="bar">
            <rect width="100%" height="100%" fill="white"/>
        </svg>

        <svg id="spent" class="bar">
            <rect width="100%" height="100%" fill="orange"/>
        </svg>

    </div>
</div>
`

export default class Terminal extends Element{
    constructor(){
        super(content)
    }

    control(){
        super.control()
    }
}

window.customElements.define('ccf-terminal', Terminal)