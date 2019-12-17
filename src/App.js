import React, { Component } from 'react';
import moment from "moment";
import { ProgressBar, Form } from "react-bootstrap";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      percentage: undefined,
      day: new Date().toLocaleString(),
      metric: 'days',
      interval: this.getNumOfSeconds('days')
    };

    this.updatePercentageByMetric = this.updatePercentageByMetric.bind(this);
    this.updateMetric = this.updateMetric.bind(this);
    this.getNumOfSeconds = this.getNumOfSeconds.bind(this);
  }

  getNumOfSeconds(metric) {
    let numOfSeconds;
    switch (metric) {
      case 'seconds':
        numOfSeconds = 1;
        break;

      case 'minutes':
        numOfSeconds = 60;
        break;

      case 'hours':
        numOfSeconds = 3600;
        break;

      case 'days':
        numOfSeconds = 86400;
        break;

      case 'weeks':
        numOfSeconds = 604800;
        break;

      case 'year':
        numOfSeconds = moment().isLeapYear() ? 31622400 : 31536000;
        break;

      default:
        break;
    }

    return numOfSeconds;
  }

  updateMetric(e) {
    const newMetric = e.target.value;
    let newInterval = this.getNumOfSeconds(newMetric);
    this.setState({ metric: newMetric, interval: newInterval * 1000 }, this.updatePercentageByMetric);
  }

  updatePercentageBySeconds() {
    const secondsPassedInCurrYear = (moment() - moment().startOf('year')) / 1000;
    console.log("seconds = " + secondsPassedInCurrYear);
    const secondsInCurrYear = this.getNumOfSeconds('year');

    this.setState({ percentage: parseFloat(secondsPassedInCurrYear / secondsInCurrYear * 100).toFixed(2) });
  }

  updatePercentageByMinutes() {
    const minutesPassedInCurrYear = moment().diff(moment().startOf('year'), 'minutes');
    console.log("minutes = " + minutesPassedInCurrYear);
    const minutesInCurrYear = moment().isLeapYear() ? 1440 * 366 : 1440 * 365;

    this.setState({ percentage: parseFloat(minutesPassedInCurrYear / minutesInCurrYear * 100).toFixed(2) });
  }

  updatePercentageByHours() {
    const hoursPassedInCurrYear = moment().diff(moment().startOf('year'), 'hours');
    console.log("hours = " + hoursPassedInCurrYear);
    const hoursInCurrYear = moment().isLeapYear() ? 24 * 366 : 24 * 365;

    this.setState({ percentage: parseFloat(hoursPassedInCurrYear / hoursInCurrYear * 100).toFixed(2) });
  }

  updatePercentageByMetric() {
    switch (this.state.metric) {
      case 'seconds':
        this.updatePercentageBySeconds();
        break;

      case 'minutes':
        this.updatePercentageByMinutes();
        break;

      case 'hours':
        this.updatePercentageByHours();
        break;

      case 'days':
        break;

      case 'weeks':
        break;

      default:
        break;
    }
  }

  componentDidMount() {
    setImmediate(this.updatePercentageByMetric);
    setInterval(this.updatePercentageByMetric, this.state.interval);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Year In Progress</h2>
          <div className="metric">
            <Form>
              <Form.Group controlId="metric">
                <Form.Label>Select Metric</Form.Label>
                <Form.Control as="select" value={this.state.metric} onChange={this.updateMetric}>
                  <option>seconds</option>
                  <option>minutes</option>
                  <option>hours</option>
                  <option>days</option>
                  <option>weeks</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
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
