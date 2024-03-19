import React from "react";
import * as Constants from "../utils/constants";
import ItemCard from "./ItemCard";

const Main = (props) => {
  const cards = () => {
    return Constants.defaultClothingItems.map((item) => {
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
              props.onClose(x, y, z);
            }}
          ></ItemCard>
        );
      }
    });
  };
  return (
    <main className="">
      {props.weatherCards}
      <ul>{cards()}</ul>
      <br />
    </main>
  );
};
export default Main;
