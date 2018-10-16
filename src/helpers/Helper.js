import _ from 'lodash';

export default class Helpers {
  renderTrueAnswers = (arr, indexes) => {
    return arr.questions[indexes.titleIndex][indexes.sectionIndex].map(
      (item, index) => ([index] = item.substring(item.length - 1)),
    );
  };

  renderQuestions = (arr, indexes) => {
    return arr.questions[indexes.titleIndex][indexes.sectionIndex].map(
      (item, index) => ([index] = ''),
    );
  };

  answersToArray = (arr) => arr.map((item, index) => ([index] = item.value));

  getWrongAnswers = (arr1, arr2) =>
    arr1.filter((el, index) => el !== arr2[index]);

  getAllAnswers = (arr1, arr2) => arr1.map((el, index) => {
    if (el !== arr2[index]) {
      return [index] = 'no';
    };
    return [index] = 'yes';
  });

  getDecoy = (count, decoy) => {
    const decoys = this._getDecoys(count, decoy);

    if (decoys !== '0') {
      const minMax = decoys.split('-');

      return _.random(minMax[0], minMax[1]);
    }

    return parseInt(decoys);
  };

  _getDecoys = (count, decoy) =>
    decoy.filter((el, index) => index === count)[0];
}
