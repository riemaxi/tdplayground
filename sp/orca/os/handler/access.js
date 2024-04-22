module.exports = class Access extends require('./dataobject'){
    constructor(config){
        super(config.path)

        console.log('access data', this.data)
    }

    request(r){
        switch(r.id){
            case 'grant' : return this.grant(r.detail)
            case 'list' : return this.list()
        }
    }

    list(){
        console.log('access list')
        let entry = (id, data) => ({
            id,
            badge: data.badge,
            role: data.role,
            description: data.description
        })

        let detail = Object.entries(this.data).map(e => entry(e[0], e[1] ) )

        return {
            id: 'list',
            detail
        }
    }

    grant(credential){
        console.log('access grant', credential)

        let {to, id, password} = credential

        let ok = id && password && this.data[id]?.password == password

        return {
            id: 'grant',
            detail: {
                to,
                id,
                ok
            }
        }
    }
}