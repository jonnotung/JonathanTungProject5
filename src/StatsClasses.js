import React, {Fragment} from 'react';
import StatsExpandedClasses from './StatsExpandedClasses'

// ------------------------------------------------------------------
// -----------------Component for classes tab in stats section-------
// ------------------------------------------------------------------

const StatClasses = (props) => {

    //mapping to easily switch caret icon direction and accessible label description for expand/hide
    const openClosedMap = {
        labelMessage: "Expand",
        caret: "down"
    };

    return(
        <Fragment>
            <ul className="expandedList">
            <h3>Classes in the database. Expand to show the students in each class.</h3>
                {Object.keys(props.classStudents).map( (key) => {
                    if (props.openEntries.includes(key)){
                        openClosedMap.labelMessage="Close";
                        openClosedMap.caret="up";
                    }
                    return(
                            <Fragment>
                                <li key={key} index={key}>
                                    <button  onClick={() => props.handleClick(key)}>
                                        {key}
                                        <label className="visuallyHidden">{openClosedMap.labelMessage}</label>
                                        <i className={`fas fa-caret-${openClosedMap.caret}`}></i>
                                    </button> 
                                </li>
                                <StatsExpandedClasses
                                    openEntries={props.openEntries}
                                    currentKey={key}
                                    studentsIn={props.classStudents[key]}
                                />
                           </Fragment>
                    );
                } )}
            </ul>
        </Fragment>
    );
}

export default StatClasses;