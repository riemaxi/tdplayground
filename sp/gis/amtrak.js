const amtrak = require('amtrak')

module.exports = class Amtrak{
    constructor(){
        this.updateTrains()
    }

    updateTrains(){
        this.listTrains().then(data => this.trains = data)
    }

    listTrains(){
        if (this.trains)
            return new Promise((resolve) => resolve(this.trains)) 
        else {
            return amtrak.fetchAllTrains().then(data => this.trains = data)
        }
    }
}