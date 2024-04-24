module.exports = class Marketplace extends require('./dataobject'){
    constructor(config){
        super(config.path)

        console.log('marketplace', this.data)
    }
}