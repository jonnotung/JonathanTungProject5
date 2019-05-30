import React from 'react';

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
        
    </form>
    );
}

export default Enroll;