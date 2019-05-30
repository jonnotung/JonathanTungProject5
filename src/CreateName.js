import React from 'react';
import InputFeedback from './InputFeedback.js';

const CreateName = (props) => {
    
        return(
            <form className="nameCreate">
                <label htmlFor="name">
                    <h4>Enter student name:</h4>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter student name"
                    value={props.values}
                    onChange={props.changes}
                />
                <InputFeedback
                    inputID={props.inputErrorID}
                    nameError={props.nameError} 
                />
            </form>
        );
}

export default CreateName; 