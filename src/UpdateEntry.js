import React, { Fragment } from 'react';
import CreateSharedElements from './CreateSharedElements.js';
import Enroll from './Enroll.js';
import EnrolledList from './EnrolledList';
import InputFeedback from './InputFeedback.js';
import firebase from './firebase.js';

class UpdateEntry extends CreateSharedElements {
    
    constructor() {
        super();
        this.state = {
            name: ``,
            enrolled: [],
            currentClass: '',
            enrollError: false,
            nameError: false,
            inputErrorID: -1,
            currentStudent: {}
        }
    }

    handleSearch = () => {
        //reference to our firebase
        const dbRef = firebase.database().ref();
        if (this.state.name) {
            //get snapshot of data in firebase
            //do things in once function to ensure we have the data before working on it
            dbRef.once(`value`, (data) => {
                //variable to check if we found the entry in database
                let found = false;
                //iterate over the data we got back
                for (let student in data.val()) {
                    //if the entry's name matches the search string
                    if(data.val()[student].name === this.state.name) {
                        //set our state with the entry's enrolled classes and the student object
                        const tempStudent = data.val()[student];
                        tempStudent.key = student;
                        //we've found a match
                        found = true;
                        this.setState({
                            currentStudent: tempStudent,
                            enrolled: data.val()[student].enrolled,
                            inputErrorId: -1,
                            nameError: false
                        });
                    }
                }
                //if we didn't find a match reset state
                if (!found) {
                    this.setState({
                        name: ``,
                        enrolled: [],
                        currentClass: '',
                        enrollError: false,
                        nameError: false,
                        inputErrorID: -1,
                        currentStudent: {}
                    });
                }

               

            });
        } else {
            this.setState({
                inputErrorID: 0,
                nameError: true
            })
        }
    }

    handleUpdate = () => {
        if (this.state.enrolled.length > 0) {
            const dbRef = firebase.database().ref(this.state.currentStudent.key);
            const newEnroll = {enrolled: this.state.enrolled};
            dbRef.update(newEnroll);
            this.setState ({
                name: ``,
                enrolled: [],
                currentClass: '',
                enrollError: false,
                inputErrorID: -1,
                currentStudent: {}
            });
        } else {
            this.setState({
                inputErrorID: -1,
                enrollError: true
            });
        }
    }

    render() {
        return(
            <div className="innerWrapper update">
                <h2>Update Existing Entries</h2>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="name"
                        id="nameSearch"
                        placeholder="Search for student"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <InputFeedback
                        inputID={this.state.inputErrorID}
                        nameError={this.state.nameError}
                    />
                    <button onClick={ this.handleSearch } className="searchButton">Search</button>
                </form>
                
                {/* Check if we've successfully searched for a student */}
                {/* Only display this when we have */}
                { Object.keys(this.state.currentStudent).length >= 1 ?
                    <Fragment>
                        <h3>Entry for {this.state.currentStudent.name}</h3>
                        <Enroll
                            changes={this.handleChange.bind(this)}
                            values={this.state.currentClass}
                            inputErrorID={this.state.inputErrorID}
                            enrollError={this.state.enrollError}
                        />
                        <button className="enrollButton" onClick={this.handleEnroll.bind(this)}>Enroll</button>

                        <EnrolledList
                            enrolled={this.state.enrolled}
                            handleDelete={this.handleDeleteEnroll.bind(this)}
                            anythingEnrolled={this.state.enrolled.length > 0}
                            numEnrolled={this.state.enrolled.length}
                        />
                        <button className="updateButton" onClick={this.handleUpdate.bind(this)}>Update Entry</button>
                    </Fragment> :
                    <Fragment></Fragment>
                }
            </div>
        );
    }
}

export default UpdateEntry;