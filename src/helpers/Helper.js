import _ from 'lodash';

export default class Helpers {
  _renderRightAnswers = (data, indexes) => {
    return data.questions[indexes.titleIndex][indexes.sectionIndex].map(
      (item, index) => ([index] = item.substring(item.length - 1)),
    );
  };

  _renderQuestions = (data, indexes) => {
    return data.questions[indexes.titleIndex][indexes.sectionIndex].map(
      (item, index) => ([index] = ''),
    );
  };

  _answersToArray = (arr) => arr.map((item, index) => ([index] = item.value));

  _getWrongAnswers = (arr1, arr2) =>
    arr1.filter((el, index) => el !== arr2[index]).length;

  _getAllAnswers = (arr1, arr2) =>
    arr1.map((el, index) => {
      if (el !== arr2[index]) {
        return ([index] = '1');
      }

      return ([index] = '0');
    });

  _statisticAnswers = (answers) => {
    const length = answers.length;

    let result = new Array(length);
    result.fill(0, 0, length);

    const stats = [0.125, 0.25, 0.5, 1, 0.5, 0.25, 0.125];

    answers.map((el, index) => {
      if (el === '1') {
        for (let p = index - 3, i = 0; p <= index + 3; p++, i++) {
          if (result[p] !== undefined) {
            if (index > 9 && index < result.length) {
              result[p] += stats[i];
              result[p] += 0.1;
            } else {
              result[p] += stats[i];
            }
          }
        }
      }

      return result;
    });

    return result;
  };

  _getDecoy = (data, count) => {
    const decoys = data.decoy.filter((el, index) => index === count)[0];
    if (decoys !== '0') {
      const minMax = decoys.split('-');
      return _.random(minMax[0], minMax[1]);
    }
    return parseInt(decoys);
  };

  algorithm = (data, indexes, userAnswers) => {
    const rightAnswers = this._renderRightAnswers(data, indexes);
    const emptyQuestions = this._renderQuestions(data, indexes);
    const answers = this._answersToArray(userAnswers);
    const filteredAnswers = this._getAllAnswers(rightAnswers, answers);
    const countWrongAnswers = this._getWrongAnswers(rightAnswers, answers);
    const stat = this._statisticAnswers(filteredAnswers);
    const decoy = this._getDecoy(data, countWrongAnswers);

    console.log('f', filteredAnswers);
    console.log('c', countWrongAnswers);
    console.log('s', stat);
    console.log('d', decoy);
  };
}
