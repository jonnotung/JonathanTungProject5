import React, {Component, Fragment} from 'react';
import Header from './Header.js';
import CreateName from './CreateName.js';
import Enroll from './Enroll.js';
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
                    <section className="createForms" >
                        <CreateName
                            changes={this.handleChange.bind(this)}
                            values={this.state.name}
                            submitting={this.handleSubmit.bind(this)}
                        />
                        <Enroll 
                            changes={this.handleChange.bind(this)}
                            values={this.state.currentClass}
                            submitting={this.handleSubmit.bind(this)}
                        />
                       
                        <button className="enrollButton" onClick={this.handleEnroll.bind(this)}>Enroll</button>
                        <h3>Enrolled Classes:</h3>
                        <ul className="enrolledList">
                            {this.state.enrolled.map((currentClass, i) => {
                                return (
                                    <li key={i} index={i} onClick={() => this.handleDeleteEnroll(i)} className="enrolledItems">{currentClass} <i className="far fa-times-circle"></i></li>
                                );
                            })}
                        </ul>
                        {/* submit button outside to prevent user hitting enter on name field and activating enroll function */}
                        <button className="createButton" onClick={this.handleCreate.bind(this)}>Create Entry</button>
                    </section>
                </div>
            </Fragment>
        );
    }
}

export default CreateEntry;