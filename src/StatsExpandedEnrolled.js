import React from "react";
import { CSSTransition } from "react-transition-group";

// ---------------------------------------------------------------------------
// ---component for expanded list of classes when you click on a student-------
// ----------------------------------------------------------------------------

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
                props.entry.enrolled.map((item, i) => {
                    return (
                        <li key={i}>{item}</li>
                    )
                }) : ""
            }
            </ul>
        </CSSTransition>
        
    );
}

export default StatsExpandedEnrolled;