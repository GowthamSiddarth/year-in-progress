import React, { Component } from 'react';
import moment from "moment";
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      percentage: 0,
      day: new Date().toLocaleString()
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4>Year In Progress</h4>
          <div className="today">
            {moment(this.state.day).format('DD MMM YYYY')}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
