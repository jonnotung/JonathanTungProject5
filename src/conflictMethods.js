class ConflictMethods {

    //argument: object with {name: [enrolled classes]}
    //returns a graph where verticies = classes, edges = a student is taking classes that the edge connnects
    getConflictGraph = (entries) => {
        const graph = {};
        for(let key in entries) {
            for(let i = 0; i < entries[key].length; i++) {
                
            }
        }
        return graph;
    }


}

export default ConflictMethods;