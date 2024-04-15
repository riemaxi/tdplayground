let symbol = {
    clock: '&#9200;',
    sdn: '&#9000;',
    enter: '&#9166;',
    play: '&#9205;',
    pause: '&#9208;',
    stop : '&9209#;',
    digital : '&#9085;',
    data : '&#9017;',
    banking : '&#8383;',
    process : '&#9094;',
    ux : '&#128187;',
    ccf: '&#128176;',
    teledigit: '&#11134;',
    dbia: '&#10066;',
    logica: '&#8797;'
}

export default class State{
    constructor(){
        this.symbol = symbol
    }

    get _objects(){
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
                        x : 2 + Math.ceil(Math.random() * 25),
                        y : 2 + Math.ceil(Math.random() * 25)
                    }
                }
            }
        return list
    }

    get objects(){ return {} }

    get _links(){
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
    get links(){  return {}  }

    get tiles(){ return {}}

   get data(){
        return {
            objects: this.objects,
            links: this.links,
            tilles: this.tiles
        }
    }

    get library(){
        return {
            protocols: {
                basic: {
                    '00000': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    },

                    '00001': {
                        request: {
                            id: '',
                            data: {}
                        },

                        response: {
                            id: '',
                            data: {}
                        }
                    },

                    '00002': {
                        request: {
                            id: '',
                            data: {}
                        },

                        response: {
                            id: '',
                            data: {}
                        }
                    },

                    '00003': {
                        request: {
                            id: '',
                            data: {}
                        },

                        response: {
                            id: '',
                            data: {}
                        }
                    }


                },

                streaming: {
                    '00000': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    },

                    '00001': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    },
                    '00002': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    },

                    '00003': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    }
                },

                storage: {
                    '00000': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    },
                    '00001': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    }
                },

                sync: {
                    '00000': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    },

                    '00001': {
                        request: {
                            id: '',
                            data: {}
                        },
                        response: {
                            id: '',
                            data: {}
                        }
                    }
                }
            },
            services: {
                basic: {
                    '00000': {},
                    '00002': {}
                },
                streaming: {
                    '00000': {}
                },
                storage: {
                    '00000': {}
                },
                sync: {
                    '00000': {}
                }

            },
            categories: {
                sdn: {
                    name: 'TDPnet',
                    symbol: this.symbol['sdn'],
                    services: ['*']
                },
                digital : {
                    name: 'Digital',
                    symbol: this.symbol['digital'],
                    services: ['basic', 'sync']
                },
                data : {
                    name: 'Data',
                    symbol: this.symbol['data'],
                    services: ['*']
                },
                banking: {
                    name: 'Banking',
                    symbol: this.symbol['banking'],
                    services: ['basic', 'sync']
                },
                process: {
                    name: 'Process',
                    symbol: this.symbol['process'],
                    services: ['basic', 'sync']
                } 
            },
            providers: {
                logica: {
                    name: 'Logic gate',
                    description: 'Boolean Algebra implementation',
                    symbol: this.symbol['logica'],
                    address: 'logica.orca.playground.4da',
                    addresses: ['logica.orca.playground.4da'],
                    categories: ['digital']
                },
                
                dbia: {
                    name: 'DBia',
                    description: 'Distributed database',
                    symbol: this.symbol['dbia'],
                    address: 'dbia.orca.playground.4da',
                    addresses: ['dbia.orca.playground.4da'],
                    categories: ['data']
                },

                teledigit: {
                    name: 'TeleDigit',
                    description:  'TDPnet elements and core services',
                    symbol: this.symbol['teledigit'],
                    address: 'teledigit.orca.playground.4da',
                    addresses: ['teledigit.orca.playground.4da'],
                    categories: ['sdn']
                },

                ccf: {
                    name: 'CCF',
                    description: 'Banking services',
                    symbol: this.symbol['ccf'],
                    address: 'ccf.orca.playground.4da',
                    addresses: ['ccf.orca.playground.4da'],
                    categories: ['banking']
                },

                ux: {
                    name: 'UX',
                    description: 'User Experience',
                    symbol: this.symbol['ux'],
                    address: 'ux.orca.playground.4da',
                    addresses: ['ux.orca.playground.4da'],
                    categories: ['*']
                },

                kronia: {
                    name: 'Kronia',
                    description: 'Timing',
                    symbol: this.symbol['clock'],
                    address: 'kronia.orca.playground.4da',
                    addresses: ['kronia.orca.playground.4da'],
                    categories: ['process']
                }

            }

        }
    }


}