module.exports = class Repository extends require('./dataobject'){
    constructor(config){
        super(config.path)
        console.log('repository', this.data)
    }

    request(r){
        switch(r.id){
            case 'list' : return this.list(r.detail)
            case 'load' : return this.load(r.detail)
            case 'update' : return this.update(r.detail)
            case 'remove' : return this.remove(r.detail)
        }
    }

    listDetail(owner){
        return Object.values(this.data).filter(item => item.project.owner == owner)
    }

    list(owner){
        return {
            id: 'list',
            detail : this.listDetail(owner)
        }
    }

    create(project, data){
        console.log('create', project, data)
        let id = this.getId()
        this.data[id] = {id, project, data}

        return id
    }

    load(id){
        return {
            id: 'load',
            detail: this.data[id]
        }
    }

    update(r){
        let {project, data} = r
        console.log('update', project, data)
        if (project.id && this.data[project.id]){
            console.log('update', project.id, data)
            this.data[project.id] = data
            return { id: 'update', detail: true}
        }else
            return {
                    id: 'update',
                    detail: !project.id && this.create(project, data)
            }
    }

    remove(id){
        if (this.data[id]){
            delete this.data[id]
            return { id:"remove", detail: true}
        }

        return { id:"remove", detail: false}
    }
}