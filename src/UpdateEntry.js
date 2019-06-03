import React from "react";
import CreateSharedElements from "./CreateSharedElements.js";
import Enroll from "./Enroll.js";
import EnrolledList from "./EnrolledList";
import InputFeedback from "./InputFeedback.js";
import firebase from "./firebase.js";

// ------------------------------------------------------------------
// --------------------component for update tab----------------------
// ------------------------------------------------------------------

class UpdateEntry extends CreateSharedElements {
    
    constructor() {
        super();
        this.state = {
            name: "",
            enrolled: [],
            currentClass: "",
            enrollError: false,
            nameError: false,
            inputErrorID: -1,
            currentStudent: {},
            errorMessage: ""
        }
    }

    handleSearch = () => {
        //reference to our firebase
        const dbRef = firebase.database().ref();
        if (this.state.name) {
            //get snapshot of data in firebase
            //do things in once function to ensure we have the data before working on it
            dbRef.once("value", (data) => {
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
                //if we didn"t find a match reset state
                //show feedback to user
                if (!found) {
                    this.setState({
                        name: "",
                        enrolled: [],
                        currentClass: "",
                        enrollError: false,
                        nameError: true,
                        inputErrorID: 0,
                        currentStudent: {},
                        errorMessage: "No matching name found in database!"
                    });
                }

               

            });
        } else {
            //if no input is in search field tell user to enter something
            this.setState({
                inputErrorID: 0,
                nameError: true,
                errorMessage: "Enter a name that's between 1 and 25 characters!"
            })
        }
    }

    //Submits state to update database entry
    handleUpdate = () => {
        //needs to have at least 1 class enrolled
        //enroll function prevents more than 6 classes being entered, so not checking that here
        if (this.state.enrolled.length > 0) {
            //get database reference and update entry with info in state
            const dbRef = firebase.database().ref(this.state.currentStudent.key);
            const newEnroll = {enrolled: this.state.enrolled};
            dbRef.update(newEnroll);
            //reset state
            this.setState ({
                name: "",
                enrolled: [],
                currentClass: "",
                enrollError: false,
                inputErrorID: -1,
                currentStudent: {}
            });
        } else {
            //if no class is entered show feedback to user to enter a class
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
                        errorMessage={this.state.errorMessage}
                    />
                    <button onClick={ this.handleSearch } className="searchButton">Search</button>
                </form>
                
                {/* Check if we"ve successfully searched for a student */}
                {/* Only display this when we have */}
                { Object.keys(this.state.currentStudent).length >= 1 ?
                    <div aria-live="polite">
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
                    </div> :
                    ""
                }
            </div>
        );
    }
}

export default UpdateEntry;