module.exports = class Setting extends require('./dataobject'){
    constructor(config){
        super(config.path)
        console.log('setting', this.data)
    }
}