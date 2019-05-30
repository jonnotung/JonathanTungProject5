import React, {Component, Fragment} from 'react';
import Header from './Header.js';
import CreateName from './CreateName.js';
import Enroll from './Enroll.js';
import EnrolledList from './EnrolledList';
// import InputFeedback from './InputFeedback.js';
import firebase from './firebase.js';

// ------------------------------------------------------------------
// ---separate create and update forms to have different state-------
// ------------------------------------------------------------------

class CreateEntry extends Component {
    // stores data about a single student in state
    constructor() {
        super();
        this.state = {
            name: ``,
            enrolled: [],
            currentClass: '',
            inputErrorID: -1,
            nameError: false,
            enrollError: false
        };
        //bind event handlers 'this' to this component, so they can be passed as props
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleCreate = this.handleCreate.bind(this);
        // this.handleEnroll = this.handleEnroll.bind(this);
        // this.handleDeleteEnroll =this.handleDeleteEnroll.bind(this);
    }

    //remove default behaviour
    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        //captures input in input fields to state immediately
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEnroll = (event) => {
        event.preventDefault();

        //get a copy of enrolled classes for current student to work on
        const enrolledCopy = [...this.state.enrolled];

        //regex to check if input is in accepted form - 3 letters 3 numbers
        const pattern = /^([a-z]|[A-Z]){3}[0-9]{3}$/;

        //only save if something has been entered in the correct format, 
        //and there's less than 6 classes currently entered
        if (pattern.exec(this.state.currentClass) && this.state.enrolled.length < 6) {
            enrolledCopy.push(this.state.currentClass);

            //update state with newly enrolled class
            this.setState({
                enrolled: enrolledCopy,
                //reset currently input class
                currentClass: ``,
                inputErrorID: -1,
                enrollError: false
            })
        } else {
            //otherwise update state to refresh to show a message to the user about proper input format
            this.setState({
                inputErrorID: 1,
                enrollError: true
            });
        }
    }

    handleCreate = (event) => {
        const dbRef = firebase.database().ref();

        //only upload if at least 1 class has been enrolled and something is in the name field
        if (this.state.name && this.state.enrolled.length > 0) {
            //upload data stored in current state to firebase
            dbRef.push({
                name: this.state.name,
                enrolled: this.state.enrolled
            });
            //reset state to empty default
            this.setState({
                name: ``,
                enrolled: [],
                currentClass: '',
                inputErrorID: -1,
                nameError: false
            });
        } else {
            //otherwise update state to refresh to show a message to the user to enter a proper name 
            this.setState({
                inputErrorID: 0,
                nameError: true
            });
        }
    }

    handleDeleteEnroll = (index) => {
        //filter out <li> we clicked on
        //save this as a new array
        const newState = this.state.enrolled.filter((currentClass, i) => {
            return i !== index;
        });
        //set new state
        this.setState({
            enrolled: newState
        });
    }

    render() {
        // binding event handlers to this component to get form fields resetting on submit
        return(
            <Fragment>
                <div className="innerWrapper create">
                    <Header />
                    {/* put handeSubmit on parent element of forms to prevent default behaviour for both when sumbitted */}
                    <section className="createForms" onSubmit={this.handleSubmit}>
                        <CreateName
                            changes={this.handleChange.bind(this)}
                            values={this.state.name}
                            submitting={this.handleSubmit.bind(this)}
                            inputErrorID={this.state.inputErrorID}
                            nameError={this.state.nameError}
                        />
                        <Enroll 
                            changes={this.handleChange.bind(this)}
                            values={this.state.currentClass}
                            submitting={this.handleSubmit.bind(this)}
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
                        
                        <button className="createButton" onClick={this.handleCreate.bind(this)}>Create Entry</button>
                    </section>
                </div>
            </Fragment>
        );
    }
}

export default CreateEntry;