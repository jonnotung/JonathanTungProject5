import React, {Fragment} from 'react';
import StatsExpandedEnrolled from './StatsExpandedEnrolled.js';

const StatsEnrolled = (props) => {

    return(
        <ul>
            {props.entries.map((entry, i) => {
                return (
                    <Fragment key={i}>
                        <li index={i}>
                        <button  onClick={() => props.handleClick(i)}>
                            {entry.name} 
                            <label className="visuallyHidden">Expand</label>
                            <i className="far fa-caret-square-down"></i>
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