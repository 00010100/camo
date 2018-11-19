import React from 'react';
import PropTypes from 'prop-types';

import './StatisticBox.css';

const StatisticBox = (props) => {
  return (
    <div className="statistic">
      <div className="statistic-inner">
        <p className="lead title">{`${props.title}:`}</p>
        <p className="lead">{props.resultList}</p>
      </div>
      <small>{props.content}</small>
    </div>
  );
};

StatisticBox.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  resultList: PropTypes.string.isRequired,
};

export default StatisticBox;
