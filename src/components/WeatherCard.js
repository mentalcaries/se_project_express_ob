import React from 'react';

import * as Constants from "../utils/constants"

const WeatherCard = (props) => {
  return (
    <div className='weather-modal'>
      <div className='weather-temp'>{`${props.temp} F`}</div>
      <img className='weather-card' src={Constants.cardConditions.night.stormy} alt="Weather condition" />
    </div>
  );
};

export default WeatherCard;
