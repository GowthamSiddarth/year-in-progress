import React, { Component } from 'react';
import moment from "moment";
import { ProgressBar } from "react-bootstrap";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      percentage: undefined,
      day: new Date().toLocaleString(),
      metric: 'days'
    };

    this.updatePercentage = this.updatePercentage.bind(this);
  }

  updatePercentage() {
    const dayOfYear = moment(this.state.day).dayOfYear();
    const daysInYear = moment().isLeapYear ? 366 : 355;

    this.setState({ percentage: parseFloat(dayOfYear / daysInYear * 100).toFixed(2) });
  }

  componentDidMount() {
    setImmediate(this.updatePercentage);
    setInterval(this.updatePercentage, 86400);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4>Year In Progress</h4>
          <div className="today">
            {moment(this.state.day).format('DD MMM YYYY')}
          </div>
          <div className="year-progress">
            {
              this.state.percentage ? <ProgressBar now={this.state.percentage} label={`${this.state.percentage}%`} /> : ""
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
