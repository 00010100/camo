import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

import StatisticBox from '../StatisticBox';
import {
  getWrongFirstPassAnswers,
  getWrongFirstPassAnswersLength,
  getWrongSecondPassAnswersLength,
  getStringDecoys,
  getStatistics,
  getChartsValues,
} from '../../selectors';

import './FourthScreen.css';

const options = {
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const dataset = data.datasets[tooltipItem.datasetIndex];
        const labelset = data.labels[tooltipItem.index];

        const total = dataset.data.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
        const currentValue = dataset.data[tooltipItem.index];
        const percentage = Math.floor((currentValue / total) * 100 + 0.5);
        return `${labelset}: ${percentage}%`;
      },
    },
  },
};

class FourthScreen extends Component {
  static propTypes = {
    wrongFirstPassAnswers: PropTypes.string.isRequired,
    wrongFirstPassAnswersLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    wrongSecondPassAnswersLength: PropTypes.number.isRequired,
    decoysList: PropTypes.string.isRequired,
    statistics: PropTypes.objectOf(PropTypes.string).isRequired,
    chartsValues: PropTypes.objectOf(PropTypes.number).isRequired,
  };

  renderChart = (firstVal, secondVal, labels, backgroundColor, hoverBackgroundColor) => {
    return {
      labels,
      datasets: [
        {
          data: [firstVal, secondVal],
          backgroundColor,
          hoverBackgroundColor,
        },
      ],
    };
  };

  render() {
    const {
      wrongFirstPassAnswers,
      wrongFirstPassAnswersLength,
      wrongSecondPassAnswersLength,
      decoysList,
      statistics,
      chartsValues,
    } = this.props;

    console.log('wrongFirstPassAnswersLength', wrongFirstPassAnswersLength);

    return (
      <div className="jumbotron stat">
        <p className="lead">{`You missed ${wrongFirstPassAnswersLength} on your first pass through the section.`}</p>
        <p className="lead">{`Real Wrong Answers: ${wrongFirstPassAnswers}`}</p>
        <p className="lead">{`Decoys: ${decoysList}`}</p>

        <hr className="my-4" />

        <h2 align="center">Your Camouflage Review Results</h2>

        <p className="lead">{`You missed ${wrongSecondPassAnswersLength} questions on your camouflage review.`}</p>

        <StatisticBox
          resultList={statistics.wrongFirstWrongSecond}
          title="CONCEPTUAL GAPS"
          content="Review these questions closely! Since you missed them twice, there are likely conceptual
            gaps in your process that need to be remedied for a higher score next time."
        />
        <StatisticBox
          resultList={statistics.wrongFirstRightSecond}
          title="MISREADS"
          content="These questions were corrected on your second pass, meaning these wrong answers are
          likely due to rushing, anxiety, and misreads. Improve your focus and translation skills,
          and these misread wrong answers will decrease."
        />
        <StatisticBox
          resultList={statistics.rightFirstWrongSecond}
          title="SELF-DOUBT"
          content="These questions were correct on your first pass through the section, but you changed
          them to an incorrect answer in Camouflage Review. This means a lack of confidence may be
          costing you points. If you aren’t really sure you’re right, you can easily fall for
          wrong answer traps the next time you encounter a similar question."
        />
        <StatisticBox
          resultList={statistics.rightFirstRightSecond}
          title="SELF-CONFIDENCE"
          content="You correctly stayed on these decoys. This means you have confidence in your choices and are more likely to remain consistent in your scores."
        />

        <div className="chart-container">
          {typeof wrongFirstPassAnswersLength !== 'string' && (
            <div className="chart-section">
              <p>WRONG ANSWER PROFILE</p>
              <Pie
                data={this.renderChart(
                  chartsValues.firstValue,
                  chartsValues.secondValue,
                  ['Misread', 'Conceptual gaps'],
                  ['#00b386', '#008080'],
                  ['#009973', '#006666']
                )}
                width={200}
                height={200}
                options={options}
              />
            </div>
          )}
          {chartsValues.thirdValue !== undefined && chartsValues.fourthValue !== undefined && (
            <div className="chart-section">
              <p>CORRECT ANSWER PROFILE</p>
              <Pie
                data={this.renderChart(
                  chartsValues.thirdValue,
                  chartsValues.fourthValue,
                  ['Self-confidence', 'Self-doubt'],
                  ['#00b386', '#008080'],
                  ['#009973', '#006666']
                )}
                width={200}
                height={200}
                options={options}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wrongFirstPassAnswers: getWrongFirstPassAnswers(state),
  wrongFirstPassAnswersLength: getWrongFirstPassAnswersLength(state),
  wrongSecondPassAnswersLength: getWrongSecondPassAnswersLength(state),
  decoysList: getStringDecoys(state),
  statistics: getStatistics(state),
  chartsValues: getChartsValues(state),
});

export default connect(
  mapStateToProps,
  null
)(FourthScreen);
