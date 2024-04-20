module.exports = class Assistant extends require('./dataobject'){
    constructor(config){
        super(config.path)

        console.log('assistant', this.data)
    }
}