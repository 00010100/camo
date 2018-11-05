import React, { Component } from 'react';
import PieChart from 'react-chartjs/lib/pie';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './FourthScreen.css';

export default class FourthScreen extends Component {
  static propTypes = {
    results: PropTypes.objectOf(PropTypes.objectOf(PropTypes.any)),
  };

  state = {
    not1but2: '',
    not1not2: '',
    and1and2: '',
    and1not2: '',
  };

  componentDidMount() {
    this.match();
    this.matchWithWrong();
    this.wrongWithMatch();
    this.wrong();
  }

  renderWrongFirst = () => {
    const listWrong = this.props.results[1].listWrong;

    if (_.isEmpty(listWrong)) {
      return 'None';
    }

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

  wrongWithMatch = () => {
    const { results } = this.props;

    const obj1 = results[1].listWrong;
    const obj2 = results[2].listMatch;
    const not1but2 = {};

    for (let i in obj1) {
      if (obj1[i] !== undefined && obj2[i] !== undefined) {
        if (obj1[i] !== obj2[i]) {
          not1but2[i] = obj2[i];
        }
      }
    }

    this.setState({ not1but2 });
  };

  wrong = () => {
    const { results } = this.props;

    const obj1 = results[1].listWrong;
    const obj2 = results[2].listWrong;
    const not1not2 = {};

    for (let i in obj1) {
      if (obj1[i] !== undefined && obj2[i] !== undefined) {
        if (obj1[i] === obj2[i]) {
          not1not2[i] = obj2[i];
        }
      }
    }

    this.setState({ not1not2 });
  };

  objToString = (obj) => {
    if (_.isEmpty(obj)) {
      return 'None';
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

  renderFirstChart = () => {
    const { not1but2, not1not2 } = this.state;
    const { results } = this.props;

    return [
      {
        value: this.getRatio(not1but2, results[2].missCount),
        color: '#008080',
        highlight: '#006666',
        label: 'Misread',
      },
      {
        value: this.getRatio(not1not2, results[2].missCount),
        color: '#00b386',
        highlight: '#009973',
        label: 'Conceptual gap',
      },
    ];
  };

  renderSecondChart = () => {
    const { and1and2, and1not2 } = this.state;
    const { results } = this.props;

    return [
      {
        value: this.getRatio(and1and2, results[2].missCount),
        color: '#00b386',
        highlight: '#009973',
        label: 'Self-condence',
      },
      {
        value: this.getRatio(and1not2, results[2].missCount),
        color: '#008080',
        highlight: '#006666',
        label: 'Self-doubt',
      },
    ];
  };

  render() {
    const { not1but2, not1not2, and1and2, and1not2 } = this.state;
    const { results } = this.props;

    return (
      <div className="jumbotron">
        <p className="lead">{`You missed ${
          results[1].missCount
        } on your first pass through the section.`}</p>
        <p className="lead">{`Real Wrong Answers: ${this.renderWrongFirst()}`}</p>
        <p className="lead">{`Decoys: ${this.objToString(results[1].listDecoys)}`}</p>

        <hr className="my-4" />

        <h2 align="center">Your Camouflage Review Results:</h2>

        <p className="lead">{`You missed ${
          results[2].missCount
        } questions on your camouflage review.`}</p>

        <div className="statistic">
          <p className="lead">{`CONCEPTUAL GAPS: ${this.objToString(not1but2)}`}</p>
          <small>
            Review these questions closely! Since you missed them twice, there are likely conceptual
            gaps in your process that need to be remedied for a higher score next time.
          </small>
        </div>

        <div className="statistic">
          <p className="lead">{`MISREADS: ${this.objToString(not1not2)}`}</p>
          <small>
            These questions were corrected on your second pass, meaning these wrong answers are
            likely due to rushing, anxiety, and misreads. Improve your focus and translation skills,
            and these misread wrong answers will decrease.
          </small>
        </div>

        <div className="statistic">
          <p className="lead">{`SELF-DOUBT: ${this.objToString(and1and2)}`}</p>
          <small>
            These questions were correct on your first pass through the section, but you changed
            them to an incorrect answer in Camouflage Review. This means a lack of confidence may be
            costing you points. If you aren’t really sure you’re right, you can easily fall for
            wrong answer traps the next time you encounter a similar question.
          </small>
        </div>

        <div className="statistic">
          <p className="lead">{`SELF-CONFIDENCE: ${this.objToString(and1not2)}`}</p>
          <small>
            You correctly stayed on these decoys. This means you have confidence in your choices and
            are more likely to remain consistent in your scores.
          </small>
        </div>

        <div className="chart-container">
          <div className="chart-section">
            <p>WRONG ANSWER PROFILE</p>
            <PieChart
              data={this.renderFirstChart()}
              options={{ animationEasing: 'easeInOutCirc' }}
              width="200"
              height="200"
            />
          </div>

          <div className="chart-section">
            <p>CORRECT ANSWER PROFILE</p>
            <PieChart
              data={this.renderSecondChart()}
              options={{ animationEasing: 'easeInOutCirc' }}
              width="200"
              height="200"
            />
          </div>
        </div>
      </div>
    );
  }
}
