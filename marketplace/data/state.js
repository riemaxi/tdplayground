module.exports = class State{
    constructor(){

    }

    getInterfaces(ids){
        return [
            {
                id: 1000,
                data:{
                    name: 'Bobo AB', 
                    date: Date.now(),
                    play: '',
                    repo: '',
                    instagram: '',
                    youtube: ''
                }
            },

            {
                id: 1001,
                data: {
                    name: 'Coco AB', 
                    date: Date.now(),
                    play: '',
                    repo: '',
                    instagram: '',
                    youtube: ''
                }
            },

            {
                id: 1002,
                data: {
                    name: 'Mona AB', 
                    date: Date.now(),
                    play: '',
                    repo: '',
                    instagram: '',
                    youtube: ''
                }
            },

            {
                id: 1003,
                data: {
                    name: '4DA', 
                    date: Date.now(),
                    play: '',
                    repo: '',
                    instagram: '',
                    youtube: ''
                }
            },

            {
                id: 1004,
                data: {
                    name: '4DA', 
                    date: Date.now(),
                    play: '',
                    repo: '',
                    instagram: '',
                    youtube: ''
                }
            },

            {
                id: 1005,
                data: {
                    name: 'Tetris SA', 
                    date: Date.now(),
                    play: '',
                    repo: '',
                    instagram: '',
                    youtube: ''
                }
            },

            {
                id: 1006,
                data: {
                    name: '4DA', 
                    date: Date.now(),
                    play: '',
                    repo: '',
                    instagram: '',
                    youtube: ''
                }
            }
        ].filter(item => ids.indexOf(item.id) >= 0 )
    }

    get serviceproviders(){
        return [
            {
                id: '0',
                data: {
                    name: 'Chess',
                    author: 'Sam',
                    date: Date.now(),
                    latest: {provider: '4da', date: Date.now()},
                    trending: {provider: 'some', ranking: 4},
                    description: 'Chess game',
                    tags: ['gaming','strategy'],

                    interfaces: this.getInterfaces( [1000, 1001])
                }
            },
            {
                id: '10',
                data: {
                    name: 'Chatty',
                    author: 'Sam',
                    date: Date.now(),
                    description: 'Video chat',
                    latest: {provider: '4da', date: Date.now()},
                    trending: {provider: 'some', ranking: 4},
                    description: 'Video chat',
                    tags: ['chat','social'],

                    interfaces: this.getInterfaces([1002, 1003])
                }
            },
            {
                id: '20',
                data: {
                    name: 'Skatty',
                    author: 'Alex',
                    date: Date.now(),
                    description: 'Taxation',
                    latest: {provider: '4da', date: Date.now()},
                    trending: {provider: 'some', ranking: 4},
                    description: 'Business and Taxation',
                    tags: ['gov','finance'],

                    interfaces: this.getInterfaces([1004])
                }
            },

            {
                id: '30',
                data: {
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
            }
        ]
    }
}