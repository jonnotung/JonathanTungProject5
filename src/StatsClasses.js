import React, {Fragment} from 'react';
import StatsExpandedClasses from './StatsExpandedClasses'

const StatClasses = (props) => {
    
    return(
        <Fragment>
            <ul>
                {Object.keys(props.classStudents).map( (key) => {
                    return(
                            <Fragment>
                                <li key={key} index={key}>
                                    <button  onClick={() => props.handleClick(key)}>
                                        {key}
                                        <label className="visuallyHidden">Expand</label>
                                        <i className="far fa-caret-square-down"></i>
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