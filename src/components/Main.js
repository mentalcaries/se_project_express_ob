import React, { useContext } from 'react';
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext"


// this proiject need to be compatible with all devices including desktop and mobile {hint => (display:grid && keyframes)}

const Main = (props) => {

  const cards = () => {
    return props.cardContent.map((item) => {
 
      const weatherCategory =
        props.temperature >= 86
          ? "hot"
          : props.temperature >= 66 && props.temperature <= 85
            ? "warm"
            : "cold";
      if (item.weather === weatherCategory) {
        if (item.name == "moncler jacket"){
        }
        return (
          <ItemCard
            name={item.name}
            weather={item.weather}
            imageUrl={item.link}
            handleClick={( x, y, z) => {
              props.toggleItemModal(item._id, x, y, z);
            }}
          ></ItemCard>
        );
      }
    });
  };
  return (
    <main className="">
      <WeatherCard temperature={props.temperature}></WeatherCard>
      <div>
        <div className="profile__section"></div>
        <ul>{cards()}</ul>
      </div>
      <br />
    </main>
  );
};
export default Main;