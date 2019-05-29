import React, {Component, Fragment} from 'react';
import Header from './Header.js';
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
            currentClass: ''
        };
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
                currentClass: ``
            })
        } else {
            //otherwise show an error message to the user and entered class name in state
            this.setState({
                currentClass: ``
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
                currentClass: ''
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
        return(
            <Fragment>
                <div className="innerWrapper create">
                    <Header />
                    <section className="createForms">
                        <form className="nameCreate" onSubmit={this.handleSubmit}>
                            <label htmlFor="name">
                                <h4>Enter student name:</h4>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                ref="name"
                                placeholder="Enter student name"
                                onChange={this.handleChange}
                                value={this.state.name}
                            />
                        </form>
                        <form className="enrollCreate" onSubmit={this.handleSubmit}>
                            <label htmlFor="enroll">
                                <h4>Add a class to enroll:</h4>
                            </label>
                            <input
                                type="text"
                                name="currentClass"
                                id="enroll"
                                ref="enroll"
                                placeholder="Enter class to enroll"
                                onChange={this.handleChange}
                                value={this.state.currentClass}
                            />
                            {/* put button in form so  user can hit enter to add a class to enrolled list */}
                            <button className="enrollButton" onClick={this.handleEnroll}>Enroll</button>
                        </form>
                        <h3>Enrolled Classes:</h3>
                        <ul className="enrolledList">
                            {this.state.enrolled.map((currentClass, i) => {
                                return (
                                    <li key={i} index={i} onClick={() => this.handleDeleteEnroll(i)} className="enrolledItems">{currentClass} <i class="far fa-times-circle"></i></li>
                                );
                            })}
                        </ul>
                        {/* submit button outside to prevent user hitting enter on name field and activating enroll function */}
                        <button className="createButton" onClick={this.handleCreate}>Create Entry</button>
                    </section>
                </div>
            </Fragment>
        );
    }
}

export default CreateEntry;