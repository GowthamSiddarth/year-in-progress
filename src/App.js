import React, { Component } from 'react';
import moment from "moment";
import { ProgressBar, Form, Container, Row, Col } from "react-bootstrap";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      percentage: undefined,
      day: new Date(),
      format: 'DD MMM YYYY',
      metric: 'days',
      intervalTime: 1000,
      intervalId: undefined
    };

    this.updatePercentageByMetric = this.updatePercentageByMetric.bind(this);
    this.updateMetric = this.updateMetric.bind(this);
  }

  updateMetric(e) {
    const newMetric = e.target.value;

    clearInterval(this.state.intervalId);
    const intervalId = setInterval(this.updatePercentageByMetric, this.state.intervalTime);

    this.setState({ metric: newMetric, intervalId: intervalId }, this.updatePercentageByMetric);
  }

  updatePercentageBySeconds() {
    const secondsPassedInCurrYear = (moment() - moment().startOf('year')) / 1000;
    const secondsInCurrYear = moment().isLeapYear() ? 31622400 : 31536000;

    this.setState({
      percentage: parseFloat(secondsPassedInCurrYear / secondsInCurrYear * 100).toFixed(8),
      day: new Date(),
      format: 'DD MMM YYYY HH:mm:ss'
    });
  }

  updatePercentageByMinutes() {
    const minutesPassedInCurrYear = moment().diff(moment().startOf('year'), 'minutes');
    const minutesInCurrYear = moment().isLeapYear() ? 1440 * 366 : 1440 * 365;

    this.setState({
      percentage: parseFloat(minutesPassedInCurrYear / minutesInCurrYear * 100).toFixed(4),
      day: new Date(),
      format: 'DD MMM YYYY HH:mm'
    });
  }

  updatePercentageByHours() {
    const hoursPassedInCurrYear = moment().diff(moment().startOf('year'), 'hours');
    const hoursInCurrYear = moment().isLeapYear() ? 24 * 366 : 24 * 365;

    this.setState({
      percentage: parseFloat(hoursPassedInCurrYear / hoursInCurrYear * 100).toFixed(4),
      day: new Date(),
      format: 'DD MMM YYYY HH'
    });
  }

  updatePercentageByDays() {
    const daysPassedInCurrYear = moment().diff(moment().startOf('year'), 'days');
    const dayssInCurrYear = moment().isLeapYear() ? 366 : 365;

    this.setState({
      percentage: parseFloat(daysPassedInCurrYear / dayssInCurrYear * 100).toFixed(2),
      day: new Date(),
      format: 'DD MMM YYYY'
    });
  }

  updatePercentageByWeeks() {
    const now = moment();
    this.setState({
      percentage: parseFloat(now.week() / now.weeksInYear() * 100).toFixed(2),
      day: new Date(),
      format: 'DD MMM YYYY ww'
    });
  }

  updatePercentageByMonths() {
    const now = moment();
    this.setState({
      percentage: parseFloat(now.month() / 12 * 100).toFixed(2),
      day: new Date(),
      format: 'DD MMM'
    });
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
        this.updatePercentageByDays();
        break;

      case 'weeks':
        this.updatePercentageByWeeks();
        break;

      case 'months':
        this.updatePercentageByMonths();
        break;

      default:
        break;
    }
  }

  componentDidMount() {
    setImmediate(this.updatePercentageByMetric);
    const intervalId = setInterval(this.updatePercentageByMetric, this.state.intervalTime);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row className="my-4">
              <Col>
                Year In Progress
              </Col>
            </Row>
            <Row className="metric">
              <Col md={{ span: 4, offset: 4 }}>
                <Form>
                  <Form.Group controlId="metric">
                    <Form.Label>Select Metric</Form.Label>
                    <Form.Control as="select" value={this.state.metric} onChange={this.updateMetric}>
                      <option>seconds</option>
                      <option>minutes</option>
                      <option>hours</option>
                      <option>days</option>
                      <option>weeks</option>
                      <option>months</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="now">
              <Col>
                {moment(this.state.day).format(this.state.format)}
              </Col>
            </Row>
            <Row className="year-progress my-4">
              <Col md={{ span: 4, offset: 4 }}>
                {
                  this.state.percentage ? <ProgressBar style={{height: '100%'}} now={this.state.percentage} label={`${this.state.percentage}%`} /> : ""
                }
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
