import React from 'react';
import { CSSTransition} from 'react-transition-group';
import InputFeedback from './InputFeedback.js';

const Enroll = (props) => {
    return(
        <form className="enrollCreate" >
            <label htmlFor="enroll">
                <h4>Add a class to enroll:</h4>
            </label>
            <input
                type="text"
                name="currentClass"
                id="enroll"
                placeholder="Enter class to enroll"
                value={props.values}
                onChange={props.changes}
            />
           
            <InputFeedback
                inputID={props.inputErrorID}
                enrollError={props.enrollError}
            />
            
        
    </form>
    );
}

export default Enroll;