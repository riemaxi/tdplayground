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
                play: '',
                repo: ''
            },
            {
                id: '10',
                name: 'Chatty',
                author: 'Sam',
                date: Date.now(),
                description: 'Video chat',
                play: '',
                repo: ''

            },
            {
                id: '20',
                name: 'Skatty',
                author: 'Alex',
                date: Date.now(),
                description: 'Taxation',
                play: '',
                repo: ''

            },

            {
                id: '30',
                name: 'Wally',
                author: 'Sam',
                date: Date.now(),
                description: 'Banking',
                play: '',
                repo: ''
            }

        ]
    }
}