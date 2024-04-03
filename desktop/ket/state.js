export default class State{
    constructor(){

    }

    getInterfaces(ids){
        return [
            {
                id: 1000,
                name: 'Bobo AB', 
                date: Date.now(),
                play: '',
                repo: '',
                instagram: '',
                youtube: ''
            },

            {
                id: 1001,
                name: 'Coco AB', 
                date: Date.now(),
                play: '',
                repo: '',
                instagram: '',
                youtube: ''
            },

            {
                id: 1002,
                name: 'Mona AB', 
                date: Date.now(),
                play: '',
                repo: '',
                instagram: '',
                youtube: ''
            },

            {
                id: 1003,
                name: '4DA', 
                date: Date.now(),
                play: '',
                repo: '',
                instagram: '',
                youtube: ''
            },

            {
                id: 1004,
                name: '4DA', 
                date: Date.now(),
                play: '',
                repo: '',
                instagram: '',
                youtube: ''
            },

            {
                id: 1005,
                name: 'Tetris SA', 
                date: Date.now(),
                play: '',
                repo: '',
                instagram: '',
                youtube: ''
            },

            {
                id: 1006,
                name: '4DA', 
                date: Date.now(),
                play: '',
                repo: '',
                instagram: '',
                youtube: ''
            }
        ].filter(item => ids.indexOf(item.id) >= 0 )
    }

    get serviceproviders(){
        return [
            {
                id: '0',
                name: 'Chess',
                author: 'Sam',
                date: Date.now(),
                latest: {provider: '4da', date: Date.now()},
                trending: {provider: 'some', ranking: 4},
                description: 'Chess game',
                tags: ['gaming','strategy'],

                interfaces: this.getInterfaces( [1000, 1001])
            },
            {
                id: '10',
                name: 'Chatty',
                author: 'Sam',
                date: Date.now(),
                description: 'Video chat',
                latest: {provider: '4da', date: Date.now()},
                trending: {provider: 'some', ranking: 4},
                description: 'Video chat',
                tags: ['chat','social'],

                interfaces: this.getInterfaces([1002, 1003])

            },
            {
                id: '20',
                name: 'Skatty',
                author: 'Alex',
                date: Date.now(),
                description: 'Taxation',
                latest: {provider: '4da', date: Date.now()},
                trending: {provider: 'some', ranking: 4},
                description: 'Business and Taxation',
                tags: ['gov','finance'],

                interfaces: this.getInterfaces([1004])
            },

            {
                id: '30',
                name: 'Wally',
                author: 'Sam',
                date: Date.now(),
                description: 'Banking',
                latest: {provider: '4da', date: Date.now()},
                trending: {provider: 'some', ranking: 4},
                description: 'Bankinf and finance wallet',
                tags: ['banking', 'finance'],

                interfaces: this.getInterfaces([1005, 1006])
            }
        ]
    }
}