import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CSSTransition } from 'react-transition-group';
import "react-tabs/style/react-tabs.css";
import CreateEntry from './CreateEntry.js';
import UpdateEntry from './UpdateEntry.js';
import Stats from './Stats.js';
import './App.css';

//Main app class 
class App extends Component {

  render() {
    return (
      <div className="App outerWrapper">
        <Tabs>
          <label className="visuallyHidden">Use left and right arrow keys to navigate the menu</label>
          <TabList>
            <Tab>Create</Tab>
            <Tab>Update</Tab>
            <Tab>Stats</Tab>
          </TabList>

          
            <TabPanel>
              <CSSTransition 
                in={true}
                appear={true}
                timeout={900}
                classNames="fade"
              >
                <CreateEntry />
              </CSSTransition>
            </TabPanel>
          
          
          <TabPanel>
            <CSSTransition 
              in={true}
              appear={true}
              timeout={900}
              classNames="fade"
            >
              <UpdateEntry />
            </CSSTransition>
          </TabPanel>

          <TabPanel>
            <CSSTransition
              in={true}
              appear={true}
              timeout={900}
              classNames="fade"
            >
              <Stats />
            </CSSTransition>
          </TabPanel>
          
        </Tabs>
      </div>
      
    );

  }
}

export default App;
