import React from 'react';
import sunnyDayImage from "../images/sunny.svg"
import sunnyNightImage from "../images/sunnyNight.svg"
import rainyDayImage from "../images/rainy.svg"
import rainyNightImage from "../images/rainyNight.svg"
import snowyDayImage from "../images/snow.svg"
import snowyNightImage from "../images/snowyNight.svg"
import foggyDayImage from "../images/fog.svg"
import foggyNightImage from "../images/foggyNight.svg"
import stormyDayImage from "../images/storm.svg"
import stormyNightImage from "../images/stormyNight.svg"
import cloudyDayImage from "../images/cloudy.svg"
import cloudyNightImage from "../images/cloudyNight.svg"

const cardConditions = {
  day: { sunny: sunnyDayImage, rainy: rainyDayImage, snowy: snowyDayImage, foggy: foggyDayImage, stormy: stormyDayImage, cloudy: cloudyDayImage },
  night: { sunny: sunnyNightImage, rainy: rainyNightImage, snowy: snowyNightImage, foggy: foggyNightImage, stormy: stormyNightImage, cloudy: cloudyNightImage },
}

const WeatherCard = (props) => {
  return (
    <div className='weather-modal'>
      <div className='weather-temp'>{`${props.temp} F`}</div>
      <img className='weather-card' src={cardConditions.night.rainy} alt="Weather condition" />
    </div>
  );
};

export { WeatherCard };
