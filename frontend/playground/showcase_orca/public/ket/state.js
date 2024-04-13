export default class State{
    constructor(){
    }

    get objects(){
        let list = {}
        for(let id=0; id<=5; id++)
            list[id] = {
                id,
                data: {
                    feature: {
                        color: ['red','blue','green', 'black', 'orange'][Math.floor(Math.random()*5)],
                        size : 2
                    },
                    state: {
                        x : 10 + Math.ceil(Math.random() * 25),
                        y : 10 + Math.ceil(Math.random() * 25)
                    }
                }
            }
        return list
    }

    get links(){
        return {
            '0-1':{
                id: '0-1',
                feature: {a: 0, b:1}
            },
            '3-5': {
                id: '3-5',
                feature: {a: 3, b: 5}
            },
            '5-2': {
                id: '5-2',
                feature: {a: 5, b: 2}
            },
            '4-3': {
                id: '4-3',
                feature: {a: 4, b: 3}
            }
        }
    }

    get tiles(){ return {}}

   get data(){
        return {
            objects: this.objects,
            links: this.links,
            tilles: this.tiles
        }
    }

}