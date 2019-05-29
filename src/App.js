import React, {Component, Fragment} from 'react';
import './App.css';
import dummyTestData from './dummyTestData.js';

//Main app class 
class App extends Component {
  // stores data about a single student in state
  constructor() {
    super();
    this.state = {
      currentStudent: {
        name: ``,
        enrolled: []
      },
      currentClass: ''
    };

    this.handleEnroll = this.handleEnroll.bind(this);
  }

  //load data from dummy data
  componentDidMount() {
  }

  handleEnrollChange = (event) => {
    console.log(this.refs.enroll.value);
    const newName = this.refs.enroll.value;
    this.setState({
      currentClass: newName
    })
  }

  handleEnroll = (event) => {
    event.preventDefault();
    const enrolledCopy = [...this.state.currentStudent.enrolled];
    enrolledCopy.push(this.state.currentClass)
    console.log(enrolledCopy);
    this.setState({
      currentStudent: {
        enrolled: enrolledCopy
      },
      currentClass: ``
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={  this.handleEnroll }>
          <label htmlFor="enroll">Enroll student in a class</label>
          <input type="text" name="enroll" id="enroll" ref="enroll" placeholder="Enter class to enroll" onChange={this.handleEnrollChange} />
          <button >Enroll</button>
        </form>
      </div>
    );

  }
}



export default App;
