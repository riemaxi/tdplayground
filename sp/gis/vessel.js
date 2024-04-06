module.exports = class Vessel{
    constructor(){
        this.update()
    }

    update(){
        this.data = []
    }

    listCruises(){
        return new Promise((resolve) => resolve(this.data)) 
    }
}