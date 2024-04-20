module.exports = class Repository extends require('./dataobject'){
    constructor(config){
        super(config.path)
        console.log('repository', this.data)
    }
}