import React, {Component, Fragment} from 'react';
import CreateEntry from './CreateEntry.js';
import './App.css';

//Main app class 
class App extends Component {

  render() {
    return (
      <div className="App outerWrapper">
        <CreateEntry />
      </div>
    );

  }
}


export default App;
