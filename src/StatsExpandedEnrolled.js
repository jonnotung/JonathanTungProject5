import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// ---------------------------------------------------------------------------
// ---component for expanded list of classes when you click on a student-------
// ----------------------------------------------------------------------------

const StatsExpandedEnrolled = (props) => {
    
    return(
        <TransitionGroup className="expandedEnrolled" aria-live="polite">
            {
                props.openEntries.includes(props.i) ?
                props.entry.enrolled.map((item, i) => {
                    return (
                        <CSSTransition
                            in={props.openEntries.includes(props.i)}
                            appear={true}
                            timeout={600}
                            classNames="fade"
                        >
                            <li key={i}>{item}</li>
                        </CSSTransition>
                    )
                }) : ""
            }
        </TransitionGroup>
        
        
    );
}

export default StatsExpandedEnrolled;