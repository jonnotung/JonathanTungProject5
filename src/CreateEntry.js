import React, {Fragment} from "react";
import CreateSharedElements from "./CreateSharedElements.js"
import Header from "./Header.js";
import CreateName from "./CreateName.js";
import Enroll from "./Enroll.js";
import EnrolledList from "./EnrolledList";
import firebase from "./firebase.js";

// ------------------------------------------------------------------
// ---separate create and update forms to have different state-------
// ------------------------------------------------------------------

class CreateEntry extends CreateSharedElements {
    // stores data about a single student in state
    constructor() {
        super();
        this.state = {
            name: "",
            enrolled: [],
            currentClass: "",
            inputErrorID: -1,
            nameError: false,
            enrollError: false,
            errorMessage: "",
            namesEntered: new Set()
        };
    }

    //get data from firebase on page load
    componentDidMount() {
        const dbRef = firebase.database().ref();

        //get data back from firebase
        //listen to and refresh on changes
        //do all the work here to avoid sync conflicts with data coming in
        dbRef.on("value", (data) => {
            //get a list of current names in database to check for duplicates
            let namesEntered = new Set();
            //iterate over entries
            for (let key in data.val()) {
                namesEntered = namesEntered.add(data.val()[key].name);
            }
            //set entered names into state
            this.setState({
                namesEntered: namesEntered
            });
        });
        
    }

    //handles click of 'create entry' button
    handleCreate = (event) => {
        const dbRef = firebase.database().ref();

        //only upload if at least 1 class has been enrolled and something is in the name field
        if (this.state.name && this.state.enrolled.length > 0 && !this.state.namesEntered.has(this.state.name)) {
            //upload data stored in current state to firebase
            dbRef.push({
                name: this.state.name,
                enrolled: this.state.enrolled
            });
            //reset state to empty default
            this.setState({
                name: "",
                enrolled: [],
                currentClass: "",
                inputErrorID: -1,
                nameError: false
            });
        } else if (!this.state.name) {
            //otherwise update state to refresh to show a message to the user to enter a proper name 
            this.setState({
                inputErrorID: 0,
                nameError: true,
                errorMessage: "Enter a name that's between 1 and 25 characters!"
            });
        } else if (this.state.namesEntered.has(this.state.name)) {
            //if name already exists in database let user know
            this.setState({
                inputErrorID: 0,
                nameError: true,
                errorMessage: "Student already exists in database!"
            });
        } else {
            this.setState({
                //if an inproper numer of classes has been entered let user  know
                inputErrorID: 0,
                nameError: true,
                errorMessage: "You must enroll between 1 and 6 classes!"
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
                        <h2>Create Entry</h2>
                        {/* <div className="createInputs"> */}
                            <div className="nameInputs">
                                <CreateName
                                    changes={this.handleChange.bind(this)}
                                    values={this.state.name}
                                    inputErrorID={this.state.inputErrorID}
                                    nameError={this.state.nameError}
                                    errorMessage={this.state.errorMessage}
                                />
                            </div>
                            <div className="enrollInputs">
                                <Enroll 
                                    changes={this.handleChange.bind(this)}
                                    values={this.state.currentClass}
                                    inputErrorID={this.state.inputErrorID}
                                    enrollError={this.state.enrollError}
                                    errorMessage={this.state.errorMessage}
                                />
                            </div>
                        {/* </div> */}
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