module.exports = class Access extends require('./dataobject'){
    constructor(config){
        super(config.path)

        console.log('access data', this.data)
    }
}