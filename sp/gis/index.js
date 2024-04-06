const config = require('./config')

let amtrak = new class extends require('./amtrak'){
    constructor(){
        super()
    }
}

let vessel = new class extends require('./vessel'){
    constructor(){
        super()
    }
}

let aircraft = new class extends require('./aircraft'){
    constructor(){
        super()
    }
}



new class extends require('./prompt'){
    constructor(){
        super(config.prompt)
    }

    onGranted(data){
        console.log('granted as', data.address)
    }

    onDenied(data){
        console.log('denied as', data.address)
   }


	onRequest(e){
        let {from, subject, detail} = e
        //this.response(from, {response: '<h1>Hello world</h1>', request: {subject, detail}})

        switch(detail.type){
            case 'railroad' : amtrak.listTrains().then(list => this.response(from, {response: list, request: {subject, detail}})); break;
            case 'cruise' : vessel.listCruises().then( list => this.response(from, {response: list, request: {subject, detail}}) ); break;
            case 'aircraft' : aircraft.listCommercial().then( list => this.response(from, {response: list, request: {subject, detail}}) ); break;
        }        

        console.log('on request', from, detail)
    }
}