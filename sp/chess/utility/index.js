const config = require('./config')

let data = new class extends require('./data'){
    constructor(){
        super(config.data)
    }
}

new class extends require('./prompt'){
    constructor(){
        super(config.prompt)
    }

    onGranted(data){
        console.log('granted as', data.address)
    }

    onDenied(data){
        console.log('denied as', data.address)
   }

   onPieces(e){
        console.log('on pieces')
        this.pieces(e.from, data.pieces.getData())
   }

   onBoard(e){
    console.log('on boards')
    this.board(e.from, data.board.getData())
   }

   onClock(e){
    console.log('on clock')
    this.clock(e.from, data.clock.getData())
   }

   onTheme(e){
    console.log('on theme')
    this.theme(e.from, data.theme.getData())
   }

   onCombo(e){
    console.log('on combo')
    this.combo(e.from, data.combo.getData())
   }

   onList(e){
    console.log('on list')
    this.list(e.from, data.list())
   }

}