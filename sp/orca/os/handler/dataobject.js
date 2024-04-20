const fs = require('fs')

module.exports = class DataObject{
    constructor(path){
        this.path = path
        this.data = JSON.parse(fs.readFileSync(path))
    }

    save(ready, path){
        fs.writeFile(path || this.path, JSON.stringify(this.data), e => ready && ready(e) )
    }
}
