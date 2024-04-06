const fs = require('fs')
const {v4: uuid} = require('uuid')

class DataObject{
    constructor(path){
        this.path = path
        this.data = JSON.parse(fs.readFileSync(path))
    }

    save(ready, path){
        fs.writeFile(path || this.path, JSON.stringify(this.data), e => ready && ready(e) )
    }

    getData(){
        return this.data
    }
}

class Piece extends DataObject{
    constructor(config){
        super(config.path)
    }
}

class Board extends DataObject{
    constructor(config){
        super(config.path)
    }
}

class Clock extends DataObject{
    constructor(config){
        super(config.path)
    }
}

class Theme extends DataObject{
    constructor(config){
        super(config.path)
    }
}


class Combo extends DataObject{
    constructor(config){
        super(config.path)
    }
}

module.exports = class Data{
    constructor(config){
        this.pieces = new Piece(config.piece)
        this.board = new Board(config.board)
        this.clock = new Clock(config.clock)
        this.theme = new Theme(config.theme)
        this.combo = new Combo(config.combo)
    }

    list(){
        return {
            pieces: this.pieces.getData(),
            boards: this.board.getData(),
            clocks: this.clock.getData(),
            themes : this.theme.getData(),
            combos : this.combo.getData()
        }
    }
}