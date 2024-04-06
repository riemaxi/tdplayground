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
}

class State extends DataObject{
    constructor(config){
        super(config.path)

        this.default = JSON.parse(fs.readFileSync(config.default, {encoding: 'utf-8'}))
    }

    getData(id){
        return this.data[id]
    }

    reset(id){
        this.data[id] = this.default

        return this.getData(id)
    }

    create(data){
        let id = uuid()
        this.data[id] = data

        return {id, data: this.getData(id)}
    }

    remove(id){
        delete this.data[id]
        return this.getData(id)
    }

    update(id, data){
        this.data[id] = data

        return this.getData()
    }
}

module.exports = class Data{
    constructor(config){
        this.state = new State(config.state)
    }
}