import Element from './common/element.js'

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-between;        

        background-color: lightblue;
        font-family: Arial;
        font-size: .5em;
    }

    #logo{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }

    #logo img{
        width: 90%;
    }

    .icon{
        height: 40px;
        width: 40px;
        _background-color: red;
        border-radius: 50%;
    }

    #icon_help{
        background-color: #adaaa3;
     }

     #icon_market{
        background-color: #a79670;
     }

     #icon_setting{
        background-color: #a78234;
     }

     #icon_exit{
        background-color: #725412;
     }

    .label{
        display: flex;
    }
    
    #options{
        display: flex;
        gap: 5px;
    }

    .option{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        gap: 3px;
        margin: 5px;
    }


    @media (orientation: portrait){    
        #root{
            flex-direction: row;
            align-items: center;
        }

        .option{
            height: 100%;
        }

        #options{
            flex-direction: row;
            align-items:center;
        }
    }

    @media (orientation: landscape){
        #root{
            flex-direction: column;
        }

        #options{
            flex-direction: column;
        }
     }
     
</style>
<div id="root">
    <div id="logo"><img src="./res/logo.jpg"></div>

    <div id="options">
        <div id="help" class="option">
            <div id="icon_help" class="icon"></div>
            <div class="label">HELP</div>
        </div>

        <div id="market" class="option">
            <div id="icon_market" class="icon"></div>
            <div class="label">MARKET</div>
        </div>

        <div id="setting" class="option">
            <div id="icon_setting" class="icon"></div>
            <div class="label">SETTING</div>
        </div>

        <div id="exit" class="option">
            <div id="icon_exit" class="icon"></div>
            <div class="label">EXIT</div>
        </div>
        
    </div>
</div>
`

export default class Menu extends Element{
    constructor(){
        super(content)
    }

    control(){
        super.control()

        this.get('logo').onclick = () => this.on('terminal')
        this.queryAll('.option').forEach(i => i.onclick = () => this.on(i.id))

        
    }

    on(_){}

}

window.customElements.define('ccf-menu', Menu)