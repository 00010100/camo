import React, { Component } from 'react';

import './FourthScreen';

export class FourthScreen extends Component {

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 align="center">Results:</h1>
        <p className="lead">{`You missed [ ${''} ] questions on your first pass.`}</p>
        <p className="lead">{`> [ ${''} ] were wrong.`}</p>
        <p className="lead">{`> [ ${''} ] were decoys.`}</p>
        <hr className="my-4" />
        <p className="lead">{`You missed [ ${''} ] questions on your camouflage review.`}</p>
        <p className="lead">{`1) You corrected [ ${''} ].`}</p>
        <small>This means you likely missed these questions due to misreads.</small>
        <p className="lead">{`2) You missed [ ${''} ] twice.`}</p>
        <small>This means you likely don't understand the concepts these questions are testing. Review them closly.</small>
        <p className="lead">{`3) You stuck with your correct answers to [ ${''} ]!`}</p>
        <p className="lead">{`4) You switched awway from your correct answers to [ ${''} ]!`}</p>
        <small>This means some of your wrong answers likely result from self-doubt.</small>
      </div>
    );
  }
}

export default FourthScreen;
