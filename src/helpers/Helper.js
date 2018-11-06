import _ from 'lodash';

export default class Helpers {
  _takeObj = (rawData, indexes) => {
    const questions = rawData.questions[indexes.sectionIndex][indexes.titleIndex];

    return _.toPlainObject(questions.split(/\s+(?=\d)/));
  };

  renderRightAnswers = (rawData, indexes) => {
    const obj = this._takeObj(rawData, indexes);

    let result = {};

    for (let key in obj) {
      const el = obj[key];
      result[key] = el.substring(el.length - 1);
    }

    return result;
  };

  renderQuestions = (rawData, indexes) => {
    const obj = this._takeObj(rawData, indexes);

    const result = {};

    for (let key in obj) {
      result[key] = '';
    }

    return result;
  };

  filterAnswers = (obj) => {
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

  getResults = (data, indexes, answers, decoy) => {
    const rightAnswers = this.renderRightAnswers(data, indexes);

    const filteredAnswers = this._getAllAnswers(rightAnswers, answers);
    const listWrong = this._getWrongAnswers(rightAnswers, answers);
    const listMatch = this._getMatchAnswers(rightAnswers, answers);

    const countWrongAnswers = this._getWrongAnswersLength(rightAnswers, answers);
    const stat = this._statisticAnswers(filteredAnswers);
    const camouflageCount = _.sum([countWrongAnswers, decoy]);

    const sorted = _(stat)
      .map((el, index) => [index, el])
      .orderBy([(el) => el[1]], ['desc'])
      .slice([0], [camouflageCount])
      .fromPairs()
      .value();

    const listDecoys = _(sorted)
      .map((el, index) => [index, el])
      .orderBy([(el) => el[1]], ['asc'])
      .slice([0], [decoy])
      .fromPairs()
      .value();

    return {
      missCount: this._sumObjValues(filteredAnswers),
      listWrong,
      listMatch,
      listDecoys,
    };
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

    return _.toPlainObject(filtered);
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
    let result = _.toPlainObject(arr);

    _.map(answers, (el, i) => {
      const index = parseInt(i);

      if (el !== undefined) {
        if (el === '1') {
          for (let p = index - 3, i = 0; p <= index + 3; p++, i++) {
            if (index === p) {
              result[p] += 10;
            } else {
              if (result[p] !== undefined) {
                if (index > 9 && index < Object.keys(result).length) {
                  result[p] += stats[i];
                  if (p > 9) {
                    result[p] += 0.1;
                  }
                } else {
                  result[p] += stats[i];
                }
              }
            }
            
          }
        }
      }

      return result;
    });

    return result;
  };

  _getDecoy = (data, count) => {
    const decoy = data.decoys[count];

    if (decoy !== '0') {
      const minMax = decoy.split('-');
      return _.random(minMax[0], minMax[1]);
    }

    return parseInt(decoy);
  };

  clearObj = (obj) => {
    const newObj = obj;

    for (let i in obj) {
      newObj[i] = '';
    }

    return newObj;
  };

  getDecoy = (data, indexes, answers) => {
    const rightAnswers = this.renderRightAnswers(data, indexes);
    const countWrongAnswers = this._getWrongAnswersLength(rightAnswers, answers);
    const decoy = this._getDecoy(data, countWrongAnswers);

    return decoy;
  };

  algorithm = (data, indexes, answers, decoy) => {
    const rightAnswers = this.renderRightAnswers(data, indexes);
    const filteredAnswers = this._getAllAnswers(rightAnswers, answers);
    const countWrongAnswers = this._getWrongAnswersLength(rightAnswers, answers);
    const stat = this._statisticAnswers(filteredAnswers);
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
