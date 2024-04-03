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

class SP extends DataObject{
    constructor(path){
        super(path)
    }

    list(){
        return this.data
    }

    add(data){
        let id = uuid()
        this.data.push({id, data})

        return id
    }

    remove(id){
        this.data = this.data.filter(item => item.id !== id)
    }

    update(id, data){
        let sp = this.data.find(item => item.id == id)
        if (sp)
            sp.data = data

        return sp !== null
    }

    addInterface(spid, data){
        let id = null
        let sp = this.data.find(item => item.id == spid)
        if (sp){
            id =  uuid()
            sp.data.interfaces.push({id, data})
        }

        return id
    }

    removeInterface(id){
        let sp = this.data.find(item => item.id == id)
        if (sp)
            sp.data.interfaces = sp.interfaces.filter(item => item.id !== id)

        return sp !== null
    }

    updateInterface(spid,id, data){
        let sp = this.data.find(item => item.id == spid)
        if (sp){
            let intf = sp.interfaces.find(item => item.id == id)
            if (intf){
                intf.data = data
                return true
            }
        }

        return false
    }
}

module.exports = class{
    constructor(config){
         this.sp = new SP(config.path)

         const State = require(config.state)
         let state = new State()

         //console.log('SPs', state.serviceproviders)
         
         fs.writeFileSync(config.path, JSON.stringify(state.serviceproviders))
    }
}