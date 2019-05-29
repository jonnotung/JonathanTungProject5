import React, {Component, Fragment} from 'react';
import './App.css';
import dummyTestData from './dummyTestData.js';

//Main app class 
class App extends Component {
  // stores data about a single student in state
  constructor() {
    super();
    this.state = {
      students: []
    }
  }

  //load data from dummy data
  componentDidMount() {

    const tempArray = [];

    for (let key in dummyTestData) {
      const tempStudent = {
        name: key,
        classes: dummyTestData[key]
      }

      tempArray.push(tempStudent);
    }

    console.log(tempArray);
    this.setState({
      students: tempArray
    })
  }

  render() {
    
    return (
      <div className="App">
        { this.state.students.map( (student)=>{
          return(<Fragment>
            <h2>{student.name}</h2>
            { student.classes.map( (clas) => {
              return(
                <p>{clas}</p>
              );
            } ) }
          </Fragment>)
        })}
      </div>
    );

  }
}



export default App;
