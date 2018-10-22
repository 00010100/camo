import React, { Component } from 'react';
import _ from 'lodash';

import './FourthScreen';

export class FourthScreen extends Component {
  state = {
    not1but2: '',
    not1not2: '',
    and1and2: '',
    and1not2: '',
  };

  componentDidMount() {
    this.match();
    this.matchWithWrong();
    this.wrong();
  }

  renderWrongFirst = () => {
    const listWrong = this.props.results[1].listWrong;

    return Object.keys(listWrong)
      .map((el) => el !== undefined && parseInt(el) + 1)
      .join(', ');
  };

  match = () => {
    const { results } = this.props;

    const obj1 = results[1].listMatch;
    const obj2 = results[2].listMatch;
    const and1and2 = {};

    for (let i in obj1) {
      if (obj1[i] !== undefined && obj2[i] !== undefined) {
        if (obj1[i] === obj2[i]) {
          and1and2[i] = obj2[i];
        }
      }
    }

    this.setState({ and1and2 });
  };

  matchWithWrong = () => {
    const { results } = this.props;

    const obj1 = results[1].listMatch;
    const obj2 = results[2].listWrong;
    const and1not2 = {};

    for (let i in obj1) {
      if (obj1[i] !== undefined && obj2[i] !== undefined) {
        if (obj1[i] !== obj2[i]) {
          and1not2[i] = obj2[i];
        }
      }
    }

    this.setState({ and1not2 });
  };

  wrong = () => {
    const { results } = this.props;

    const obj1 = results[1].listWrong;
    const obj2 = results[2].listWrong;
    const not1not2 = {};
    const not1but2 = {};

    for (let i in obj1) {
      if (obj1[i] !== undefined && obj2[i] !== undefined) {
        if (obj1[i] !== obj2[i]) {
          not1not2[i] = obj2[i];
        } else {
          not1but2[i] = obj2[i];
        }
      }
    }

    this.setState({ not1but2, not1not2 });
  };

  objToString = (obj) => {
    if (_.isEmpty(obj)) {
      return '0';
    }
    
    return Object.keys(obj)
      .map((el) => el !== undefined && parseInt(el) + 1)
      .join(', ');
  };

  getRatio = (obj, all) => {
    const list = this.objToString(obj);

    const count = list.split(',').length;
    return Math.round((count / all) * 100);
  };

  render() {
    const { not1but2, not1not2, and1and2, and1not2 } = this.state;
    const { results } = this.props;

    return (
      <div className="jumbotron">
        <h1 align="center">Results:</h1>
        <p className="lead">{`You missed ${results[1].missCount} questions on your first pass.`}</p>
        <p className="lead">{`> [ ${this.renderWrongFirst()} ] were wrong.`}</p>
        <p className="lead">{`> [ ${this.objToString(results[1].listDecoys)} ] were decoys.`}</p>
        <hr className="my-4" />
        <p className="lead">{`You missed ${results[2].missCount} questions on your camouflage review.`}</p>
        <p className="lead">{`1) You corrected [ ${this.objToString(not1but2)} ].`}</p>
        <small>This means you likely missed these questions due to misreads.</small>
        <p className="lead">{`2) You missed [ ${this.objToString(not1not2)} ] twice.`}</p>
        <small>
          This means you likely don't understand the concepts these questions are testing. Review them closly.
        </small>
        <p className="lead">{`3) You stuck with your correct answers to [ ${this.objToString(and1and2)} ]!`}</p>
        <p className="lead">{`4) You switched away from your correct answers to [ ${this.objToString(and1not2)} ]!`}</p>
        <small>This means some of your wrong answers likely result from self-doubt.</small>

        <div>
          <p className="lead">Here's your overall wrong answers profile:</p>
          <p className="lead">{`1) Misread: ${this.getRatio(not1but2, results[2].missCount)}%`}</p>
          <p className="lead">{`2) Conceptual gap: ${this.getRatio(not1but2, results[2].missCount)}%`}</p>
          <p className="lead">{`3) Self-condence: ${this.getRatio(and1and2, results[2].missCount)}%`}</p>
          <p className="lead">{`4) Self-doubt: ${this.getRatio(and1not2, results[2].missCount)}%`}</p>
        </div>
      </div>
    );
  }
}

export default FourthScreen;
