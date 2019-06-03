import React, {Fragment} from 'react';
import {CSSTransition} from 'react-transition-group';
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
            <ul className="enrolledList">
                {/* iterate over array of enrolled classes */}
                { props.enrolled.map((currentClass, i) => {
                    return (
                            <li key={i} index={i} onClick={() => props.handleDelete(i)} className="enrolledLI">
                                <CSSTransition
                                    in={true}
                                    appear={true}
                                    timeout={300}
                                    classNames="fade"
                                >
                                    <button className="enrolledListButton">
                                        {currentClass} 
                                        <label className="visuallyHidden">Remove</label>
                                        <i className="far fa-times-circle"></i>
                                    </button>
                                </CSSTransition>
                            </li>
                        );
                        
                    } )
                }
            </ul>
        </Fragment>
    );
}

export default EnrolledList;