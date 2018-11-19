import { createSelector } from 'reselect';
import _ from 'lodash';

import { objectToString } from '../helpers';
import {
  getStatisticAnswers,
  getCamouflageCount,
  getDecoys,
  getCamouflageQuestions,
  getFirstPassAnswers,
  getSecondPassAnswers,
  getRightAnswers,
} from '../selectors';

export const getListDecoys = createSelector(
  [getStatisticAnswers, getCamouflageCount, getDecoys],
  (answers, camouflageCount, decoys) => {
    if (answers && camouflageCount) {
      const camouflageQuestions = _(answers)
        .map((el, index) => [index, el])
        .orderBy([(el) => el[1]], ['desc'])
        .slice([0], [camouflageCount])
        .fromPairs()
        .value();

      const decoysList = _(camouflageQuestions)
        .map((el, index) => [index, el])
        .orderBy([(el) => el[1]], ['asc'])
        .slice([0], [decoys])
        .fromPairs()
        .value();

      return decoysList;
    }
  }
);

export const getWrongFirstPassAnswers = createSelector(
  [getFirstPassAnswers, getRightAnswers, getListDecoys],
  (myAnswers, rightAnswers, decoysList) => {
    let wrongAnswers = {};

    for (let key in rightAnswers) {
      if (myAnswers[key] !== undefined) {
        if (!_.isEqual(myAnswers[key], rightAnswers[key])) {
          wrongAnswers[key] = '1';
        }
      }
    }

    if (_.isEmpty(decoysList)) {
      return Object.keys(wrongAnswers)
        .map((el) => parseInt(el) + 1)
        .join(', ');
    }

    if (_.isEmpty(wrongAnswers)) return 'None';

    return Object.keys(wrongAnswers)
      .filter((el) => !Object.keys(decoysList).includes(el))
      .map((el) => parseInt(el) + 1)
      .join(', ');
  }
);

export const getStringDecoys = createSelector(
  [getListDecoys],
  (decoys) => objectToString(decoys)
);

export const getWrongFirstPassAnswersLength = createSelector(
  [getWrongFirstPassAnswers],
  (answers) => {
    if (answers === 'None') return 'None';

    return answers.split(',').length;
  }
);

export const getListOfReview = createSelector(
  [getCamouflageQuestions],
  (questions) => objectToString(questions)
);

export const getWrongSecondPassAnswers = createSelector(
  [getSecondPassAnswers, getRightAnswers],
  (myAnswers, rightAnswers) => {
    let wrongAnswers = {};

    for (let key in rightAnswers) {
      if (myAnswers[key] !== undefined) {
        if (!_.isEqual(myAnswers[key], rightAnswers[key])) {
          wrongAnswers[key] = '1';
        }
      }
    }

    return objectToString(wrongAnswers);
  }
);

export const getWrongSecondPassAnswersLength = createSelector(
  [getWrongSecondPassAnswers],
  (answers) => {
    if (answers === 'None') return 'None';

    return answers.split(',').length;
  }
);

export const getStatistics = createSelector(
  [getFirstPassAnswers, getSecondPassAnswers, getRightAnswers],
  (firstPassAnswers, secondPassAnswers, rightAnswers) => {
    const wrongFirstWrongSecond = {};
    const wrongFirstRightSecond = {};
    const rightFirstWrongSecond = {};
    const rightFirstRightSecond = {};

    for (let key in rightAnswers) {
      if (firstPassAnswers[key] !== undefined && secondPassAnswers[key] !== undefined) {
        if (!_.isEqual(firstPassAnswers[key], rightAnswers[key])) {
          if (!_.isEqual(secondPassAnswers[key], rightAnswers[key])) {
            wrongFirstWrongSecond[key] = key;
          } else {
            wrongFirstRightSecond[key] = key;
          }
        } else {
          if (!_.isEqual(secondPassAnswers[key], rightAnswers[key])) {
            rightFirstWrongSecond[key] = key;
          } else {
            rightFirstRightSecond[key] = key;
          }
        }
      }
    }

    return {
      wrongFirstWrongSecond: objectToString(wrongFirstWrongSecond),
      wrongFirstRightSecond: objectToString(wrongFirstRightSecond),
      rightFirstWrongSecond: objectToString(rightFirstWrongSecond),
      rightFirstRightSecond: objectToString(rightFirstRightSecond),
    };
  }
);

export const getChartsValues = createSelector(
  [getStatistics],
  (statistics) => {
    const length = {};

    for (let key in statistics) {
      if (statistics[key] !== 'None') {
        length[key] = statistics[key].split(',').length;
      } else {
        length[key] = 0;
      }
    }

    const values = Object.values(length);

    const firstChartsSum = values[0] + values[1];
    const secondChartsSum = values[2] + values[3];

    if (secondChartsSum === 0) {
      return {
        firstValue: Math.round((values[0] / firstChartsSum) * 100),
        secondValue: Math.round((values[1] / firstChartsSum) * 100),
      };
    }

    return {
      firstValue: Math.round((values[0] / firstChartsSum) * 100),
      secondValue: Math.round((values[1] / firstChartsSum) * 100),
      thirdValue: Math.round((values[2] / secondChartsSum) * 100),
      fourthValue: Math.round((values[3] / secondChartsSum) * 100),
    };
  }
);
