import _ from 'lodash';

export const objectToString = (obj) => {
  if (_.isEmpty(obj)) return 'None';

  return Object.keys(obj)
    .map((el) => parseInt(el) + 1)
    .join(', ');
};