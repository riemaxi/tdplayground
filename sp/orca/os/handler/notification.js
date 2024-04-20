module.exports = class Notification extends require('./dataobject'){
    constructor(config){
        super(config.path)
        console.log('notification', this.data)
    }
}