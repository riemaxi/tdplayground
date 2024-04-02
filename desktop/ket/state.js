export default class State{
    constructor(){

    }

    get list(){
        return [
            {
                id: '0',
                name: 'Chess',
                author: 'Sam',
                date: Date.now(),
                description: 'Chess game',
                link: ''
            },
            {
                id: '10',
                name: 'Chatty',
                author: 'Sam',
                date: Date.now(),
                description: 'Video chat',
                link: ''
            }

        ]
    }
}