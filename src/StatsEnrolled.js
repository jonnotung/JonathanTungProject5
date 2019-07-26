import React, {Fragment} from 'react';
import StatsExpandedEnrolled from './StatsExpandedEnrolled.js';

import {getClassConflicts, colorGraph, getSimultaneousGroups} from './scheduler'

// ------------------------------------------------------------------
// ---------component for student list tab in stats section----------
// ------------------------------------------------------------------

const StatsEnrolled = (props) => {

    // console.log(getClassConflicts( props.entries))

    return(
        <ul className="expandedList">
            <h3>Students in the database. Expand to show classes they are enrolled in.</h3>
            {props.entries.map((entry, i) => {
                //mapping to easily switch caret direction and accessible label description for expand/hide
                let openClosedMap = {
                    labelMessage: "Expand",
                    caret: "down"
                };

                if (props.openEntries.includes(i)){
                    openClosedMap.labelMessage="Close";
                    openClosedMap.caret="up";
                } 
                return (
                    <Fragment key={i}>
                        <li index={i}>
                        <button  onClick={() => props.handleClick(i)}>
                            {entry.name} 
                            <label className="visuallyHidden">{openClosedMap.labelMessage}</label>
                            <i className={`fas fa-caret-${openClosedMap.caret}`}></i>
                        </button>
                        </li>
                        
                        <StatsExpandedEnrolled
                            openEntries={props.openEntries}
                            i={i}
                            entry={entry}
                        />
                       
                    </Fragment>
                );
            })}
        </ul>
    );
}

export default StatsEnrolled;