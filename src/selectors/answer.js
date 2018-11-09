import { createSelector } from 'reselect';
import _ from 'lodash';

import { filterData, getTitleAndSectionIndexes } from '../selectors';

const getQuestions = (state) => filterData(state).questions;
export const getMyAnswers = (state) => state.answers.answers && state.answers.answers.list;
export const getFirstPassAnswers = (state) =>
  state.answers.forStatAnswers && state.answers.forStatAnswers[1];
export const getSecondPassAnswers = (state) => state.answers.forStatAnswers[2];

export const getRightAnswers = createSelector(
  [getQuestions, getTitleAndSectionIndexes],
  (questions, indexes) => {
    const questionsRaw = questions[indexes.sectionIndex][indexes.titleIndex];
    const defaultAnswers = _.toPlainObject(questionsRaw.split(/\s+(?=\d)/));

    let rightAnswers = {};

    for (let key in defaultAnswers) {
      const el = defaultAnswers[key];
      rightAnswers[key] = el.substring(el.length - 1);
    }

    return rightAnswers;
  },
);

export const getWrongAnswersLength = createSelector(
  [getRightAnswers, getFirstPassAnswers],
  (rightAnswers, myAnswers) => {
    if (myAnswers) return _.filter(rightAnswers, (el, index) => el !== myAnswers[index]).length;
  },
);

export const getResultOfAnswers = createSelector(
  [getRightAnswers, getFirstPassAnswers],
  (rightAnswers, myAnswers) => {
    if (myAnswers) {
      let wrongAnswers = {};

      for (let key in rightAnswers) {
        if (!_.isEqual(myAnswers[key], undefined)) {
          if (!_.isEqual(rightAnswers[key], myAnswers[key])) {
            wrongAnswers[key] = '1';
          } else {
            wrongAnswers[key] = '0';
          }
        }
      }

      return wrongAnswers;
    }
  },
);

export const getStatisticAnswers = createSelector([getResultOfAnswers], (answers) => {
  const values = {
    0: 0.125,
    1: 0.25,
    2: 0.5,
    3: 1,
    4: 0.5,
    5: 0.25,
    6: 0.125,
  };

  if (answers) {
    const filledAnswers = _.cloneDeep(answers);

    for (let key in filledAnswers) {
      filledAnswers[key] = 0;
    }

    _.map(answers, (el, i) => {
      const index = parseInt(i);

      if (el !== undefined) {
        if (el === '1') {
          for (let p = index - 3, i = 0; p <= index + 3; p++, i++) {
            if (index === p) {
              filledAnswers[p] += 10;
            } else {
              if (filledAnswers[p] !== undefined) {
                if (index > 9 && index < Object.keys(filledAnswers).length) {
                  filledAnswers[p] += values[i];
                  if (p > 9) {
                    filledAnswers[p] += 0.1;
                  }
                } else {
                  filledAnswers[p] += values[i];
                }
              }
            }
          }
        }
      }

      return filledAnswers;
    });

    return filledAnswers;
  }
});
