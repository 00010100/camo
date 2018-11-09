import React from 'react';
import PropTypes from 'prop-types';

import './StatisticBox.css';

const StatisticBox = (props) => {
  return (
    <div className="statistic">
      <p className="lead">{`${props.title}: ${props.resultList}`}</p>
      <small>{props.content}</small>
    </div>
  );
};

StatisticBox.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  resultList: PropTypes.string.isRequired,
}

export default StatisticBox;
