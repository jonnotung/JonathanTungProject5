import React, {Fragment} from 'react';
import CreateSharedElements from './CreateSharedElements.js'
import Header from './Header.js';
import CreateName from './CreateName.js';
import Enroll from './Enroll.js';
import EnrolledList from './EnrolledList';
import firebase from './firebase.js';
import { CSSTransition } from 'react-transition-group';

// ------------------------------------------------------------------
// ---separate create and update forms to have different state-------
// ------------------------------------------------------------------

class CreateEntry extends CreateSharedElements {
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
        } else if (this.state.name) {
            //otherwise update state to refresh to show a message to the user to enter a proper name 
            this.setState({
                inputErrorID: -1,
                nameError: false
            });
        } else {
            this.setState({
                inputErrorID: 0,
                nameError: true
            });
        }
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
                            inputErrorID={this.state.inputErrorID}
                            nameError={this.state.nameError}
                        />
                        <Enroll 
                            changes={this.handleChange.bind(this)}
                            values={this.state.currentClass}
                            inputErrorID={this.state.inputErrorID}
                            enrollError={this.state.enrollError}
                        />
                       
                        <button className="enrollButton" onClick={this.handleEnroll.bind(this)}>Enroll</button>

                        <CSSTransition 
                            in={this.state.enrolled.length > 0}
                            appear={true}
                            timeout={300}
                            classNames="fade"
                        >
                            <EnrolledList 
                                enrolled={this.state.enrolled}
                                handleDelete={this.handleDeleteEnroll.bind(this)}
                                anythingEnrolled={this.state.enrolled.length > 0}
                                numEnrolled={this.state.enrolled.length}
                            />
                        </CSSTransition>
                        
                        <button className="createButton" onClick={this.handleCreate.bind(this)}>Create Entry</button>
                    </section>
                </div>
            </Fragment>
        );
    }
}

export default CreateEntry;