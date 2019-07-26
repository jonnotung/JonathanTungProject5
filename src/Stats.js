import React, { Component, Fragment } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CSSTransition } from "react-transition-group";
import StatsEnrolled from "./StatsEnrolled.js";
import StatsClasses from "./StatsClasses.js";
import StatsSchedule from './StatsSchedule.js';
import firebase from "./firebase.js";

// ------------------------------------------------------------------
// ---------------------component for stats tab----------------------
// ------------------------------------------------------------------

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

        //get data back from firebase and store in state
        //listen to and refresh on changes
        //do all the work here to avoid sync conflicts with data coming in
        dbRef.on("value", (data) => {
            const currentEntries = [];
            for (let key in data.val()) {
                currentEntries.push({
                    name: data.val()[key].name,
                    enrolled: data.val()[key].enrolled
                })
            }
            
            //
            this.parseClasses(currentEntries);

            this.setState({
                numStudents: currentEntries.length,
                entries: currentEntries
            });


        });
    }

    //argument: array of objects that match database structure: {name: 'string', enrolled: []}
    //sets a list of all classes to state
    //sets an object with structure {class: [list of students taking class]} to state
    parseClasses = (entries) => {
        const classList = [];
        const classEnrollment = {};

        //iterate over array of objects
        for(let i = 0; i < entries.length; i++) {

            const theseClasses = entries[i].enrolled;
            const thisName = entries[i].name;

            //iterate over array of enrolled classes for this object
            for (let j = 0; j < theseClasses.length; j++) {
                if( !classList.includes(theseClasses[j]) ) {
                    //if we haven't seen this class yet push it to array
                    classList.push(theseClasses[j]);
                }

                if(!classEnrollment.hasOwnProperty(theseClasses[j])) {
                    //if we haven't seen this class yet create the key/value pair with current student's name
                    classEnrollment[theseClasses[j]] = [thisName];
                } else {
                    //if class exists in object keys, push this student's name to its array value
                    classEnrollment[theseClasses[j]].push(thisName);
                }
            }
        }
        //update state
        this.setState({
            classes: classList,
            classStudents: classEnrollment
        })
    }

    //handles clicks to expand items
    handleClick = (index) => {
        
        let tempOpen = [...this.state.openEntries];
        
        //If clicked index hasn"t been opened, add it to open list
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
                <div className="statsSummary">
                    <h2>Info Summary:</h2>
                    <h4>Students: {this.state.numStudents}</h4>
                    <h4>Classes: {this.state.classes.length}</h4>
                </div>
                <Tabs>
                    <label className="visuallyHidden">Use left and right arrow keys to navigate the menu</label>
                    <TabList>
                        <Tab>Students</Tab>
                        <Tab>Classes</Tab>
                        <Tab>Exam Schedule</Tab>
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

                    <TabPanel>
                        <CSSTransition
                            in={true}
                            appear={true}
                            timeout={900}
                            classNames="fade"
                        >
                            <StatsSchedule 
                                entries={this.state.entries}
                            />
                        </CSSTransition>
                    </TabPanel>
            
                </Tabs>
                 
            </div>
        );
    }

}

export default Stats;