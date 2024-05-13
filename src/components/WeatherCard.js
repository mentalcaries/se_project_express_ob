import React, { useContext } from 'react';
import {CurrentTemperatureUnitContext} from "../context/CurrentTemperatureUnitContext"

import * as Constants from "../utils/constants";


const WeatherCard = (props) => {
  const {CurrentTemperatureUnit, handleTemperatureUnitChange} = useContext(CurrentTemperatureUnitContext);

  const displayTemperature = CurrentTemperatureUnit === "C"
    ? Math.round((props.temperature - 32) * 5 / 9)
    : props.temperature;

  return (
    <div className="weather-modal">
      <div className="weather-temp">{`${displayTemperature} ${CurrentTemperatureUnit}°`}</div>
      <img
        className="weather-card"
        src={Constants.cardConditions.night.stormy}
        alt="Weather condition"
      />
    </div>
  );
};

export default WeatherCard;
