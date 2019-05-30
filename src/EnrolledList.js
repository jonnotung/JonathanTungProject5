import React, {Fragment} from 'react';

const EnrolledList = (props) => {
    return(
        <Fragment>
            {props.anythingEnrolled ? <h3>Enrolled Classes:</h3> : <h3></h3> }
            <ul className="enrolledList">
                { props.enrolled.map((currentClass, i) => {
                        return (
                            <li key={i} index={i} onClick={() => props.handleDelete(i)} className="enrolledLI">
                                <button className="enrolledItems">
                                    {currentClass} <i className="far fa-times-circle"></i>
                                </button>
                            </li>
                        );
                    } )
                }
            </ul>
        </Fragment>
    );
}

export default EnrolledList;