import React, { Component, Fragment } from 'react';
import StatsEnrolled from './StatsEnrolled.js';
import firebase from './firebase.js';

class Stats extends Component {

    constructor() {
        super();
        this.state ={
            entries: [],
            openEntries: []
        };
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();

        //get data back from firebase
        //listen to and refresh on changes
        dbRef.on('value', (data) => {
            const currentEntries = [];
            for (let key in data.val()) {
                currentEntries.push({
                    name: data.val()[key].name,
                    enrolled: data.val()[key].enrolled
                })
            }
            
            this.setState({
                entries: currentEntries
            });
        });
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
                <h2>Info on Currently Entered Students:</h2>
                <StatsEnrolled
                    entries={this.state.entries}
                    handleClick={this.handleClick}
                    openEntries={this.state.openEntries}
                />  
            </div>
        );
    }

}

export default Stats;