import React, {Fragment} from 'react';
import { CSSTransition } from 'react-transition-group';

const StatsExpandedEnrolled = (props) => {

    return(
        
        <CSSTransition
            in={props.openEntries.includes(props.i)}
            appear={true}
            timeout={900}
            classNames="fade"
        >
            <ul className="expandedEnrolled">
            {
                props.openEntries.includes(props.i) ?
                props.entry.enrolled.map((item) => {
                    return (
                        <li>{item}</li>
                    )
                }) : ''
            }
            </ul>
        </CSSTransition>
        
    );
}

export default StatsExpandedEnrolled;