import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './FourthScreen.css';

const options = {
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const dataset = data.datasets[tooltipItem.datasetIndex];
        const total = dataset.data.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
        const currentValue = dataset.data[tooltipItem.index];
        const percentage = Math.floor((currentValue / total) * 100 + 0.5);
        return percentage + '%';
      },
    },
  },
};

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
    this.handleCalcResults();
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

  objToString = (obj) => {
    if (_.isEmpty(obj)) {
      return 'None';
    }

    return Object.keys(obj)
      .map((el) => el !== undefined && parseInt(el) + 1)
      .join(', ');
  };

  getRatio = (firstObj, secondObj) => {
    const firstCount = Object.keys(firstObj).length;
    const secondCount = Object.keys(secondObj).length;
    const total = firstCount + secondCount;

    return [Math.round((firstCount / total) * 100), Math.round((secondCount / total) * 100)];
  };

  renderChart = (firstObj, secondObj, labels, bgColor, hoverBgColor) => {
    const firstVal = this.getRatio(firstObj, secondObj)[0];
    const secondVal = this.getRatio(firstObj, secondObj)[1];

    return {
      labels,
      datasets: [
        {
          data: [firstVal, secondVal],
          backgroundColor: bgColor,
          hoverBackgroundColor: hoverBgColor,
        },
      ],
    };
  };

  handleCalcResults = () => {
    const match1 = this.props.results[1].listMatch;
    const match2 = this.props.results[2].listMatch;
    const wrong1 = this.props.results[1].listWrong;
    const wrong2 = this.props.results[2].listWrong;
    const right = this.props.results.rightAnswers;

    const not1not2 = {};
    const not1but2 = {};
    const and1not2 = {};
    const and1and2 = {};

    for (let key in right) {
      if (
        match1[key] !== undefined ||
        match2[key] !== undefined ||
        wrong1[key] !== undefined ||
        wrong2[key] !== undefined
      ) {
        if (match1[key] !== right[key] && match2 !== right[key]) {
          not1not2[key] = key;
        } else if (wrong1[key] !== right[key] && match2[key] === right[key]) {
          not1but2[key] = key;
        } else if (match1[key] === right[key] && wrong2[key] !== right[key]) {
          and1not2[key] = key;
        } else if (match1[key] === right[key] && match2[key] === right[key]) {
          and1and2[key] = key;
        }
      }
    }

    this.setState({ not1not2, not1but2, and1not2, and1and2 });
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
          <p className="lead">{`CONCEPTUAL GAPS: ${this.objToString(not1not2)}`}</p>
          <small>
            Review these questions closely! Since you missed them twice, there are likely conceptual
            gaps in your process that need to be remedied for a higher score next time.
          </small>
        </div>

        <div className="statistic">
          <p className="lead">{`MISREADS: ${this.objToString(not1but2)}`}</p>
          <small>
            These questions were corrected on your second pass, meaning these wrong answers are
            likely due to rushing, anxiety, and misreads. Improve your focus and translation skills,
            and these misread wrong answers will decrease.
          </small>
        </div>

        <div className="statistic">
          <p className="lead">{`SELF-DOUBT: ${this.objToString(and1not2)}`}</p>
          <small>
            These questions were correct on your first pass through the section, but you changed
            them to an incorrect answer in Camouflage Review. This means a lack of confidence may be
            costing you points. If you aren’t really sure you’re right, you can easily fall for
            wrong answer traps the next time you encounter a similar question.
          </small>
        </div>

        <div className="statistic">
          <p className="lead">{`SELF-CONFIDENCE: ${this.objToString(and1and2)}`}</p>
          <small>
            You correctly stayed on these decoys. This means you have confidence in your choices and
            are more likely to remain consistent in your scores.
          </small>
        </div>
        <div className="chart-container">
          <div className="chart-section">
            <p>WRONG ANSWER PROFILE</p>
            <Pie
              data={this.renderChart(
                not1but2,
                not1not2,
                ['Misread', 'Conceptual gaps'],
                ['#00b386', '#008080'],
                ['#006666', '#009973']
              )}
              width={200}
              height={200}
              options={options}
            />
          </div>
          <div className="chart-section">
            <p>CORRECT ANSWER PROFILE</p>
            <Pie
              data={this.renderChart(
                and1and2,
                and1not2,
                ['Self-confidence', 'Self-doubt'],
                ['#008080', '#00b386'],
                ['#009973', '#006666']
              )}
              width={200}
              height={200}
              options={options}
            />
          </div>
        </div>
      </div>
    );
  }
}
