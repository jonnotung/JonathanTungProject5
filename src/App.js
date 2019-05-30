import React, {Component, Fragment} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import CreateEntry from './CreateEntry.js';
import UpdateEntry from './UpdateEntry.js';
import './App.css';

//Main app class 
class App extends Component {

  render() {
    return (
      <div className="App outerWrapper">
        <Tabs>
          <TabList>
            <Tab>Create an Entry</Tab>
            <Tab>Update an Entry</Tab>
          </TabList>

          <TabPanel>
            <CreateEntry />
          </TabPanel>
          
          <TabPanel>
            <UpdateEntry />
          </TabPanel>
          
        </Tabs>
      </div>
      
    );

  }
}

export default App;
