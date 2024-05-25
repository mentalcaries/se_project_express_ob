

import React, { useContext } from 'react';
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext";

const Main = (props) => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

  const Cards = () => {

    const cardItems = props.cardContent.slice().reverse();

    return cardItems.map((item) => {
      const weatherCategory =
        props.temperature >= 86
          ? "hot"
          : props.temperature >= 66 && props.temperature <= 85
            ? "warm"
            : "cold";
      if (item.weather === weatherCategory) {
        return (
          <ItemCard
            key={item._id}
            name={item.name}
            weather={item.weather}
            imageUrl={item.imageUrl}
            handleClick={(x, y, z) => {
              props.toggleItemModal(item._id, x, y, z);
            }}
          ></ItemCard>
        );
      }
    });
  }

  const displayTemperature = currentTemperatureUnit === "C"
    ? Math.round((props.temperature - 32) * 5 / 9)
    : props.temperature;

  return (
    <main className="">
      <WeatherCard tempUnit={currentTemperatureUnit} temperature={props.temperature}></WeatherCard>
      <div>
        <h3 className='main__text'>{`Today is ${displayTemperature} ${currentTemperatureUnit} / You may want to wear:`}</h3>
        <div className="profile__section"></div>
        <ul>{Cards()}</ul>
      </div>
      <br />
    </main>
  );
};

export default Main;
