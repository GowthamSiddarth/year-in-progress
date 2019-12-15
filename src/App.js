import React, { Component } from 'react';
import moment from "moment";
import { Line } from "rc-progress";
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      percentage: undefined,
      day: new Date().toLocaleString()
    };

    this.updatePercentage = this.updatePercentage.bind(this);
  }

  updatePercentage() {
    const dayOfYear = moment(this.state.day).dayOfYear();
    const daysInYear = moment().isLeapYear ? 366 : 355;

    this.setState({ percentage: parseFloat(dayOfYear / daysInYear * 100).toFixed(2) });
  }

  componentDidMount() {
    setTimeout(this.updatePercentage, 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4>Year In Progress</h4>
          <div className="today">
            {moment(this.state.day).format('DD MMM YYYY')}
          </div>
          <div className="progress">
            <Line percent={this.state.percentage ? this.state.percentage : 0} strokeWidth="4" strokeColor="#000000" />
            {this.state.percentage ? this.state.percentage + "%" : ""}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
