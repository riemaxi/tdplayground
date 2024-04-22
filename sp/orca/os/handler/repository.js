module.exports = class Repository extends require('./dataobject'){
    constructor(config){
        super(config.path)
        console.log('repository', this.data)
    }

    request(detail){
        switch(detail.id){
            case 'load' : return this.load(detail.data)
            case 'update' : return this.update(detail.project, detail.data)
            case 'remove' : return this.remove(detail.id)
        }
    }

    create(project, data){
        console.log('create', project, data)
        let id = this.getId()
        this.data[id] = {project, data}

        return id
    }

    load(id){
        return {
            id: 'load',
            detail: this.data[id]
        }
    }

    update(project, data){
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