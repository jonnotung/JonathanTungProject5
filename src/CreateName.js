import React, {Component} from 'react';

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
            </form>
        );
}

export default CreateName; 