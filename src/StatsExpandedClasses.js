import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// ------------------------------------------------------------------------------
// -----Component for expanded list of students taking a class----------------
// ------------------------------------------------------------------------------

const StatsExpandedClasses = (props) => {
    return(
        
        <TransitionGroup className="expandedEnrolled" aria-live="polite">
            {
                props.openEntries.includes(props.currentKey) ?
                props.studentsIn.map((item, i) => {
                    return (
                        <CSSTransition
                            in={props.openEntries.includes(props.currentKey)}
                            appear={true}
                            timeout={900}
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

export default StatsExpandedClasses;