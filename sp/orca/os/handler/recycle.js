module.exports = class Recycle extends require('./dataobject'){
    constructor(config){
        super(config.path)

        console.log('recycle', this.data)
    }
}