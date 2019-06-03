import React, {Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import InputFeedback from './InputFeedback.js';

// ---------------------------------------------------------------------------------------
// ---Component for list of clickable enrolled classes in create and update sections-------
// ---------------------------------------------------------------------------------------

const EnrolledList = (props) => {
    return(
        <Fragment>
            {props.anythingEnrolled ? <h3>Enrolled Classes:</h3> : <Fragment></Fragment> }
            <InputFeedback
                numEnrolled={props.numEnrolled}
            />
            <TransitionGroup className="enrolledList" aria-live="polite">
            {/* <ul className="enrolledList" aria-live="polite"> */}
                
                {/* iterate over array of enrolled classes */}
                { props.enrolled.map((currentClass, i) => {
                    return (
                        <CSSTransition
                            in={true}
                            appear={true}
                            timeout={300}
                            classNames="fade"
                        >
                            <li key={i} index={i} onClick={() => props.handleDelete(i)} className="enrolledLI">
                                
                                    <button className="enrolledListButton">
                                        {currentClass} 
                                        <label className="visuallyHidden">Remove</label>
                                        <i className="far fa-times-circle"></i>
                                    </button>
                                
                            </li>
                        </CSSTransition>
                        );
                        
                    } )
                }
                
            {/* </ul> */}
            </TransitionGroup>
        </Fragment>
    );
}

export default EnrolledList;