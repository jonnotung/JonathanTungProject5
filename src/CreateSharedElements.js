import { Component } from "react";

class CreateSharedElements extends Component {

    //Enters a class to state
    handleEnroll = (event) => {
        event.preventDefault();

        //get a copy of enrolled classes for current student to work on
        const enrolledCopy = [...this.state.enrolled];

        //regex to check if input is in accepted form - 3 letters 3 numbers
        const pattern = /^([a-z]|[A-Z]){3}[0-9]{3}$/;

        //only save if something has been entered in the correct format, 
        //and there"s less than 6 classes currently entered
        if (pattern.exec(this.state.currentClass) && this.state.enrolled.length < 6 && !this.state.enrolled.includes(this.state.currentClass)) {
            enrolledCopy.push(this.state.currentClass);

            //update state with newly enrolled class
            this.setState({
                enrolled: enrolledCopy,
                //reset currently input class
                currentClass: "",
                inputErrorID: -1,
                enrollError: false
            })
        } else if (this.state.enrolled.includes(this.state.currentClass)) {
            //check if it"s a duplicate class. don"t enroll if it is
            this.setState({
                inputErrorID: 1,
                enrollError: true,
                errorMessage: "Cannot enter a class twice!"
            });

        } else {
            //otherwise update state to refresh to show a message to the user about proper input format
            this.setState({
                inputErrorID: 1,
                enrollError: true,
                errorMessage: "Class names must be of the form (3 letters)(3 numbers)!"
            });
        }
    }

    //remove a class we"re enrolled in
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

    //remove default behaviour
    handleSubmit = (event) => {
        event.preventDefault();
    }

    //handles input 
    handleChange = (event) => {
        //captures input in input fields to state immediately
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}

export default CreateSharedElements