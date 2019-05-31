import React, {Fragment} from 'react';
import StatsExpandedEnrolled from './StatsExpandedEnrolled.js';

const StatsEnrolled = (props) => {

    return(
        <ul>
            {props.entries.map((entry, i) => {
                return (
                    <Fragment>
                        <button key={i} index={i} onClick={() => props.handleClick(i)}>
                            <li >{entry.name}</li>
                        </button>
                        
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