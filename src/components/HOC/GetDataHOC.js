import React, { Component } from 'react';
import _ from 'lodash';

import rawData from '../../data/data.json';

const GetDataHOC = (WrappedComponent) => {
  return class GetData extends Component {
    getData = (rawData) => {
      const data = rawData.data;

      return {
        titles: _.toPlainObject(data[0]),
        decoys: _.toPlainObject(data[9]),
        sections: {
          0: data[1][0],
          1: data[3][0],
          2: data[5][0],
          3: data[7][0]
        },
        questions: {
          0: _.toPlainObject(data[2]),
          1: _.toPlainObject(data[4]),
          2: _.toPlainObject(data[6]),
          3: _.toPlainObject(data[8])
        }
      };
    };

    render() {
      return <WrappedComponent data={this.getData(rawData)} />;
    }
  };
};

export default GetDataHOC;
