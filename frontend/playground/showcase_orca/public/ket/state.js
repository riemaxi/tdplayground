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
                    symbol: '',
                    services: ['*']
                },
                digital : {
                    name: 'Digital',
                    symbol: '',
                    services: ['basic', 'sync']
                },
                data : {
                    name: 'Data',
                    symbool: '',
                    services: ['*']
                },
                banking: {
                    name: 'Banking',
                    symbol: '',
                    services: ['basic', 'sync']
                }
            },
            providers: {
                logica: {
                    name: 'Logic gate',
                    description: 'Boolean Algebra implementation',
                    symbol: '',
                    address: '',
                    categories: ['digital']
                },
                
                dbia: {
                    name: 'DBia',
                    description: 'Distributed database',
                    symbol: '',
                    address: '',
                    categories: ['data']
                },

                teledigit: {
                    name: 'TeleDigit',
                    description:  'TDPnet elements and core services',
                    symbol: '',
                    address: '',
                    categories: ['sdn']
                },

                ccf: {
                    name: 'CCF',
                    description: 'Banking services',
                    symbol: '',
                    categories: ['bankng']
                }
            }

        }
    }


}