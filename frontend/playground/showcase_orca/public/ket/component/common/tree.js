export default class Tree {
    constructor() {
        this.nodes = {};
        this.links = [];
    }

    // 1. List children given a parent's ID
    listChildren(parentId) {
        if (!this.nodes[parentId]) {
            return { error: 'Parent node not found' };
        }
        return this.links.filter(link => link.p === parentId).map(link => this.nodes[link.c]);
    }

    // 2. List the parents at a given level (level starts from 0 for root)
    listParentsAtLevel(level) {
        if (level < 0) {
            return { error: 'Invalid level' };
        }
        let currentLevelNodes = ['0']; // Assuming '0' is the root node
        let nextLevelNodes = [];

        while (level > 0) {
            nextLevelNodes = [];
            currentLevelNodes.forEach(nodeId => {
                this.links.forEach(link => {
                    if (link.p === nodeId) {
                        nextLevelNodes.push(link.c);
                    }
                });
            });
            currentLevelNodes = nextLevelNodes;
            level--;
        }

        return currentLevelNodes.map(id => this.nodes[id]);
    }

    // 3. Add a node
    addNode(id, node) {
        if (this.nodes[id]) {
            return { error: 'Node with the given ID already exists' };
        }
        this.nodes[id] = node;
        return { success: true };
    }

    // 4. Remove a node given its ID
    removeNode(nodeId) {
        if (!this.nodes[nodeId]) {
            return { error: 'Node does not exist' };
        }
        delete this.nodes[nodeId];
        this.links = this.links.filter(link => link.p !== nodeId && link.c !== nodeId);
        return { success: true };
    }

    // 5. Get a node given its ID
    getNode(id) {
        if (!this.nodes[id]) {
            return { error: 'Node does not exist' };
        }
        return this.nodes[id];
    }

    // 6. Update a node given its ID and the new data (name, description)
    updateNode(id, newData) {
        if (!this.nodes[id]) {
            return { error: 'Node does not exist' };
        }
        this.nodes[id] = { ...this.nodes[id], ...newData };
        return { success: true };
    }
}

// Example usage can follow the same pattern with these revised method calls
