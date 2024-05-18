

import React, { useContext, useState, useEffect } from 'react';
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext"

const Main = (props) => {
  const {currentTemperatureUnit, handleToggleSwitchChange} = useContext(CurrentTemperatureUnitContext);
  const [itemCards, setCards] = useState('');

  console.log(props.cardContent)
  useEffect(() => {
    const fetchCards = () => {
      props.cardContent.then((results) =>{
        const cards = results.map((item) => {
          console.log(item);
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
                imageUrl={item.link}
                handleClick={(x, y, z) => {
                  props.toggleItemModal(item._id, x, y, z);
                }}
              ></ItemCard>
            );
          }
        });
        setCards(cards);
      })
    };

    fetchCards();
  }, [props.cardContent, props.temperature]); // Add dependencies to useEffect

  return (
    <main className="">
      <WeatherCard tempUnit={currentTemperatureUnit} temperature={props.temperature}></WeatherCard>
      <div>
        <div className="profile__section"></div>
        <ul>{itemCards}</ul>
      </div>
      <br />
    </main>
  );
};

export default Main;
