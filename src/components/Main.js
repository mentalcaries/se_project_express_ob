import React, { useContext } from 'react';
import ItemCard from "./ItemCard";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext"

// this proiject need to be compatible with all devices including desktop and mobile {hint => (display:grid && keyframes)}

const Main = (props) => {
  const { CurrentTemperatureUnit, handleTemperatureUnitChange, temperature } = useContext(CurrentTemperatureUnitContext);

  const cards = () => {
    console.log(props.cardContent)
    return props.cardContent.map((item) => {
 
      const weatherCategory =
        temperature >= 86
          ? "hot"
          : temperature >= 66 && temperature <= 85
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
      {props.weatherCards}
      <div>
        <div className="profile__section"></div>
        <ul>{cards()}</ul>
      </div>
      <br />
    </main>
  );
};
export default Main;