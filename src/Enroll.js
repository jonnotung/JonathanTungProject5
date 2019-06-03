import React from "react";
import InputFeedback from "./InputFeedback.js";

// ---------------------------------------------------------------------------------------
// --component for enroll in class input section on create entry and update sections-------
// --------------------------------------------------------------------------------------

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
                errorMessage={props.errorMessage}
            />
            
        
    </form>
    );
}

export default Enroll;