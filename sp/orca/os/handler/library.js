module.exports = class Library extends require('./dataobject'){
    constructor(config){
        super(config.path)
        console.log('library', this.data)
    }

    request(id, data){

    }

    listDetail(owner){
        return Object.values(this.data).filter(item => item.owner == owner)
    }

    list(owner){
        return {
            id: 'list',
            detail : this.listDetail(owner)
        }
    }

}