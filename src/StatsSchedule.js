import React, {Fragment} from 'react'
import {getSimultaneousGroups, colorGraph, getClassConflicts} from './scheduler'

const StatsSchedule = (props) => {

    const scheduleGroups = getSimultaneousGroups(colorGraph(getClassConflicts(props.entries)))
    const schedule = []
    for(const group in scheduleGroups) {
        
        const classIter = scheduleGroups[group].entries()
        const thisGroup = []
        for(const thisClass of classIter) {
            thisGroup.push(thisClass[0])
            
        }
        schedule.push(thisGroup)
    }
    console.log(schedule)    

    return (
        <Fragment>
            <h2>Schedule</h2>
            <div className="scheduleWrapper">
                {schedule.map((group, i) => {
                    return (
                        <ul key={i} className="scheduleSlot">
                            <h3>Slot {i+1}</h3>
                            {group.map((thisClass, id) => {
                                return(
                                    <li key={id} class="scheduleClass">{thisClass}</li>
                                )
                            })}
                        </ul>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default StatsSchedule