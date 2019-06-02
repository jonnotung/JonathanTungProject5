import React, { Component, Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CSSTransition } from 'react-transition-group';
import StatsEnrolled from './StatsEnrolled.js';
import StatsClasses from './StatsClasses.js';
import firebase from './firebase.js';

class Stats extends Component {

    constructor() {
        super();
        this.state ={
            entries: [],
            openEntries: [],
            numClasses: 0,
            classes: [],
            classStudents: {},
            numStudents: 0,
        };
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();

        //get data back from firebase
        //listen to and refresh on changes
        //do all the work here to avoid sync conflicts with data coming in
        dbRef.on('value', (data) => {
            const currentEntries = [];
            for (let key in data.val()) {
                currentEntries.push({
                    name: data.val()[key].name,
                    enrolled: data.val()[key].enrolled
                })
            }
            
            this.parseClasses(currentEntries);

            this.setState({
                numStudents: currentEntries.length,
                entries: currentEntries
            });


        });
    }

    parseClasses = (entries) => {
        const classList = [];
        const classEnrollment = {};

        for(let i = 0; i < entries.length; i++) {

            const theseClasses = entries[i].enrolled;
            const thisName = entries[i].name;

            for (let j = 0; j < theseClasses.length; j++) {
                if( !classList.includes(theseClasses[j]) ) {
                    classList.push(theseClasses[j]);
                }

                if(!classEnrollment.hasOwnProperty(theseClasses[j])) {
                    classEnrollment[theseClasses[j]] = [thisName];
                } else {
                    classEnrollment[theseClasses[j]].push(thisName);
                }
            }
        }

        this.setState({
            classes: classList,
            classStudents: classEnrollment
        })
    }

    handleClassClick = (key) => {
        let tempOpen = [...this.state.openEntries];
    }

    handleClick = (index) => {
        
        let tempOpen = [...this.state.openEntries];
        
        //If clicked index hasn't been opened, add it to open list
        if(!tempOpen.includes(index)) {     
            tempOpen.push(index);
        } else {
            //if clicked index is open, remove it from open list
            tempOpen = tempOpen.filter( (value) => {
                return value !== index;
            })
        }
        //set new state of open indexes
        this.setState({
            openEntries: tempOpen
        })
    }

    render() {
        return(
            <div className="innerWrapper stats">
                <h2>Info Summary:</h2>
                <p>Students: {this.state.numStudents}</p>
                <p>Classes: {this.state.classes.length}</p>
                <Tabs>
                    <TabList>
                        <Tab>Students</Tab>
                        <Tab>Classes</Tab>
                        
                    </TabList>

                    <TabPanel>
                        <CSSTransition 
                            in={true}
                            appear={true}
                            timeout={900}
                            classNames="fade"
                        >
                            <StatsEnrolled
                                entries={this.state.entries}
                                handleClick={this.handleClick}
                                openEntries={this.state.openEntries}
                            /> 
                        </CSSTransition>
                    </TabPanel>

                    <TabPanel>
                        <CSSTransition 
                            in={true}
                            appear={true}
                            timeout={900}
                            classNames="fade"
                        >
                            <StatsClasses 
                                classStudents={this.state.classStudents}
                                handleClick={this.handleClick}
                                openEntries={this.state.openEntries}
                            />
                        </CSSTransition>
                    </TabPanel>
            
                </Tabs>
                 
            </div>
        );
    }

}

export default Stats;