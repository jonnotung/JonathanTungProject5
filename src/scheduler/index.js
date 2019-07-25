

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
                    conflictGraph[currentClass] =[]
                }
                if(otherNotSeenYet) {
                    conflictGraph[otherClass] =[]
                }

                if(!conflictGraph[currentClass].includes(otherClass)) {
                    conflictGraph[currentClass].push(otherClass)
                }
                if(!conflictGraph[otherClass].includes(currentClass)) {
                    conflictGraph[otherClass].push(currentClass)
                }
                
            }
        }
    })
    return conflictGraph
}

