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

    return Object.keys(q).reduce((object, key) => {
      object[key] = '';
      return object;
    }, {});
  };

  _filterAnswers = (obj) => {
    const newObj = _.cloneDeep(obj);

    for (let i in newObj) {
      newObj[i] = newObj[i].value;
    }

    return newObj;
  };

  _sumObjValues = (obj) => {
    let sum = 0;

    for (let el in obj) {
      if (obj.hasOwnProperty(el)) {
        if (obj[el] !== undefined) {
          sum += parseFloat(obj[el]);
        }
      }
    }

    return sum;
  };

  missed = (data, indexes, userAnswers) => {
    const rightAnswers = this._renderRightAnswers(data, indexes);
    const answers = this._filterAnswers(userAnswers);
    const filteredAnswers = this._getAllAnswers(rightAnswers, answers);

    return this._sumObjValues(filteredAnswers);
  };

  getListWrong = (data, indexes, userAnswers) => {
    const rightAnswers = this._renderRightAnswers(data, indexes);
    const answers = this._filterAnswers(userAnswers);
    const wrongAnswers = this._getWrongAnswers(rightAnswers, answers);

    return wrongAnswers;
  };

  getListMatch = (data, indexes, userAnswers) => {
    const rightAnswers = this._renderRightAnswers(data, indexes);
    const answers = this._filterAnswers(userAnswers);
    const matchAnswers = this._getMatchAnswers(rightAnswers, answers);

    return matchAnswers;
  };

  _getWrongAnswers = (obj1, obj2) => {
    let obj3 = {};

    for (let i in obj1) {
      if (obj1[i] !== obj2[i]) {
        obj3[i] = obj2[i];
      }
    }

    return obj3;
  };

  _getMatchAnswers = (obj1, obj2) => {
    let obj3 = {};

    for (let i in obj1) {
      if (obj1[i] === obj2[i]) {
        obj3[i] = obj2[i];
      }
    }

    return obj3;
  };

  _getWrongAnswersLength = (arr1, arr2) => _.filter(arr1, (el, index) => el !== arr2[index]).length;

  _getAllAnswers = (arr1, arr2) => {
    const filtered = _.map(arr1, (el, index) => {
      if (arr2[index] !== undefined) {
        if (el !== arr2[index]) {
          return ([index] = '1');
        }

        return ([index] = '0');
      }
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
      6: 0.125
    };

    const length = Object.keys(answers).length;
    const arr = new Array(length);
    arr.fill(0, 0, length);
    let result = this._toObj(arr);

    _.map(answers, (el, i) => {
      const index = parseInt(i);

      if (el !== undefined) {
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
      }

      return result;
    });

    return result;
  };

  getWillDecoy = (data, indexes, userAnswers) => {
    const rightAnswers = this._renderRightAnswers(data, indexes);
    const answers = this._filterAnswers(userAnswers);
    const filteredAnswers = this._getAllAnswers(rightAnswers, answers);
    const countWrongAnswers = this._getWrongAnswersLength(rightAnswers, answers);
    const stat = this._statisticAnswers(filteredAnswers);
    const decoy = this._getDecoy(data, countWrongAnswers);
    const camouflageCount = _.sum([countWrongAnswers, decoy]);

    const sorted = _(stat)
      .map((el, index) => [index, el])
      .orderBy([(el) => el[1]], ['desc'])
      .slice([0], [camouflageCount])
      .fromPairs()
      .value();

    return _(sorted)
      .map((el, index) => [index, el])
      .orderBy([(el) => el[1]], ['asc'])
      .slice([0], [decoy])
      .fromPairs()
      .value();
  };

  _getDecoy = (data, count) => {
    count = count >= data.decoy.length ? (count = data.decoy.length - 1) : count;

    const decoys = _.filter(data.decoy, (el, index) => index === count)[0];

    if (decoys !== '0') {
      const minMax = decoys.split('-');
      return parseInt(minMax[0]);
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
    const countWrongAnswers = this._getWrongAnswersLength(rightAnswers, answers);
    const stat = this._statisticAnswers(filteredAnswers);
    const decoy = this._getDecoy(data, countWrongAnswers);
    const camouflageCount = _.sum([countWrongAnswers, decoy]);

    const sorted = _(stat)
      .map((el, index) => [index, el])
      .orderBy([(el) => el[1]], ['desc'])
      .slice([0], [camouflageCount])
      .fromPairs()
      .value();

    return this.clearObj(sorted);
  };
}
