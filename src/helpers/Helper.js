import _ from 'lodash';

export default class Helpers {
  _toObj = (arr) => _.assignIn({}, arr);

  _renderRightAnswers = (data, indexes) => {
    const q = data.questions[indexes.titleIndex][indexes.sectionIndex];
    const filtered = _.map(q, (item, index) => ([index] = item.substring(item.length - 1)));

    return this._toObj(filtered);
  };

  renderQuestions = (data, indexes) => {
    const q = data.questions[indexes.titleIndex][indexes.sectionIndex];

    const filtered = _.map(q, (item, index) => ([index] = ''));
    return this._toObj(filtered);
  };

  _filterAnswers = (obj) => {
    const newObj = _.cloneDeep(obj);

    for(let i in newObj) {
      newObj[i] = newObj[i].value;
    }

    return newObj;
  };

  missed = (data, indexes, userAnswers) => {
    const rightAnswers = this._renderRightAnswers(data, indexes);
    const answers = this._filterAnswers(userAnswers);
    const filtered = _.filter(rightAnswers, (el, index) => el !== answers[index]);

    // console.log('rightAnswers', rightAnswers)
    // console.log('answers', answers)

    // console.log('filtered', filtered)

    return this._toObj(filtered);
  };

  _getWrongAnswers = (arr1, arr2) => _.filter(arr1, (el, index) => el !== arr2[index]).length;

  _getAllAnswers = (arr1, arr2) => {
    const filtered = _.map(arr1, (el, index) => {
      if (el !== arr2[index]) {
        return ([index] = '1');
      }

      return ([index] = '0');
    });

    return this._toObj(filtered);
  };

  _statisticAnswers = (answers) => {
    const stats = {
      0: 0.125,
      1: 0.25,
      2: 0.5,
      3: 1,
      4: 0.5,
      5: 0.25,
      6: 0.125,
    };

    const length = Object.keys(answers).length;
    const arr = new Array(length);
    arr.fill(0, 0, length);
    let result = this._toObj(arr);

    _.map(answers, (el, i) => {
      const index = parseInt(i);

      if (el === '1') {
        for (let p = index - 3, i = 0; p <= index + 3; p++, i++) {
          if (result[p] !== undefined) {
            if (index > 9 && index < Object.keys(result).length) {
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
    const decoys = _.filter(data.decoy, (el, index) => index === count)[0];

    if (decoys !== '0') {
      const minMax = decoys.split('-');
      return _.random(minMax[0], minMax[1]);
    }

    return parseInt(decoys);
  };

  clearObj = (obj) => {
    for (let i in obj) {
      obj[i] = '';
    }

    return obj;
  };

  algorithm = (data, indexes, userAnswers) => {
    const rightAnswers = this._renderRightAnswers(data, indexes);
    const answers = this._filterAnswers(userAnswers);
    const filteredAnswers = this._getAllAnswers(rightAnswers, answers);
    const countWrongAnswers = this._getWrongAnswers(rightAnswers, answers);
    const stat = this._statisticAnswers(filteredAnswers);
    const decoy = this._getDecoy(data, countWrongAnswers);
    const camouflageCount = _.sum([countWrongAnswers, decoy]);

    console.log('rightAnswers', rightAnswers)
    console.log('filteredAnswers', filteredAnswers)
    console.log('stat', stat)

    const sorted = _(stat)
      .map((el, index) => [index, el])
      .orderBy([(el) => el[1]], ['desc'])
      .slice([0], [camouflageCount])
      .fromPairs()
      .value();

    console.log('sorted', sorted)

    return this.clearObj(sorted);
  };
}
