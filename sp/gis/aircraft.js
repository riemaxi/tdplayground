module.exports = class Aircraft{
    constructor(){
        this.update()
    }

    update(){
        this.data = []
    }

    listCommercial(){
        return new Promise((resolve) => resolve(this.data)) 
    }
}