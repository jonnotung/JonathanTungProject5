export const getClassConflicts = (entries) => {
    const conflictGraph = {}

    entries.forEach(( entry) => {
        for(let i = 0; i< entry.enrolled.length -1; i++) {
            const currentClass = entry.enrolled[i]
            for(let j = i+1; j<entry.enrolled.length; j++) {
                const otherClass = entry.enrolled[j]
                const currentNotSeenYet = typeof conflictGraph[currentClass] === 'undefined'
                const otherNotSeenYet = typeof conflictGraph[otherClass] === 'undefined'
                
                if(currentNotSeenYet) {
                    conflictGraph[currentClass] = {conflicts: []}
                }
                if(otherNotSeenYet) {
                    conflictGraph[otherClass] = { conflicts: [] }
                }

                if(!conflictGraph[currentClass].conflicts.includes(otherClass)) {
                    conflictGraph[currentClass].conflicts.push(otherClass)
                }
                if(!conflictGraph[otherClass].conflicts.includes(currentClass)) {
                    conflictGraph[otherClass].conflicts.push(currentClass)
                }
                
            }
        }
    })
    return conflictGraph
}

const findMaxDegree = (conflictGraph) => {
    let maxDegree = 0
    for(let node in conflictGraph) {
        if(conflictGraph[node].conflicts.length > maxDegree) {
            maxDegree = conflictGraph[node].conflicts.length
        }
    }
    return maxDegree
}

export const colorGraph = (conflictGraph) => {
    const maxSimulGroups = findMaxDegree(conflictGraph) + 1
    for(let node in conflictGraph) {
        const illegalGroups = new Set()
        conflictGraph[node].conflicts.forEach( (neighbour) => {
            
            if(conflictGraph[neighbour].group) {
                illegalGroups.add(conflictGraph[neighbour].group)
            }
        })

        for(let i = 1; i <= maxSimulGroups; i++) {
            if(!illegalGroups.has(i)) {
                conflictGraph[node].group = i 
                break
            }
        }
    }
    return conflictGraph
}



export const getSimultaneousGroups = (conflictGraph) => {
    const groups = {}

    for (const node in conflictGraph) {
        const currentGroup = conflictGraph[node].group
        if(!groups[currentGroup]) {
            groups[currentGroup] = new Set()
        }
        groups[currentGroup].add(node)
    }
    return groups
}