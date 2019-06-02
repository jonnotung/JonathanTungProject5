import React, {Fragment} from 'react';
import { CSSTransition } from 'react-transition-group';

const StatsExpandedClasses = (props) => {
    console.log(props.studentsIn)
    return(
        <CSSTransition
            in={props.openEntries.includes(props.key)}
            appear={true}
            timeout={900}
            classNames="fade"
        >
            <ul className="expandedEnrolled">
            {
                props.openEntries.includes(props.currentKey) ?
                props.studentsIn.map((item, i) => {
                    return (
                        <li key={i}>{item}</li>
                    )
                }) : ''
            }
            </ul>
        </CSSTransition>
        
    );
    
}

export default StatsExpandedClasses;