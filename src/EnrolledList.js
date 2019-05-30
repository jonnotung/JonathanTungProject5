import React, {Fragment} from 'react';
import InputFeedback from './InputFeedback.js';

const EnrolledList = (props) => {
    return(
        <Fragment>
            {props.anythingEnrolled ? <h3>Enrolled Classes:</h3> : <h3></h3> }
            <InputFeedback
                numEnrolled={props.numEnrolled}
            />
            <ul className="enrolledList">
                { props.enrolled.map((currentClass, i) => {
                    return (
                        <li key={i} index={i} onClick={() => props.handleDelete(i)} className="enrolledLI">
                            <button className="enrolledListButton">
                                {currentClass} <i className="far fa-times-circle"></i>
                            </button>
                        </li>);
                    } )
                }
            </ul>
        </Fragment>
    );
}

export default EnrolledList;