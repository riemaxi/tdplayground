module.exports = class Library extends require('./dataobject'){
    constructor(config){
        super(config.path)
        console.log('library', this.data)
    }
}