class Basic{
    constructor(nodes, links){
        this.nodes = nodes 
        this.links = links
    }

    getChildren(rootid){
        let list = this.links.filter(item => item.parent == rootid).map(item => item.child)
        return this.nodes.filter(item => list.indexOf(item.id) >= 0)
    }

    getNode(id){
        return this.nodes.find(item => item.id == id)
    }
}

class SPTree extends Basic{
        constructor(nodes, links){
            super(nodes, links)
        }
    
        getNodesByType(id){
            return this.nodes.filter(item => item.data.type== id)
        }
    
        compatible(a, b){
            let nodea = this.nodes.find(item => item.id == a)
            let nodeb = this.nodes.find(item => item.id == b)
            return nodea !== undefined && nodeb !== undefined && nodea.type == nodeb.type
        }
    }
    
    module.exports = {
        Basic,
        SPTree
    }