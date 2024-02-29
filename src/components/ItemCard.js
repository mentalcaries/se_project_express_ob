import React from "react";

const ItemCard = (props) => {
  return (
    <li
      className="card"
      onClick={() => {
        props.handleClick(props.name, props.imageUrl, props.weather);
      }}
    >
      <img className="card__image" src={props.imageUrl?props.imageUrl:"NaN"} alt={props.name?props.name:"NaN"} />
      <h3 className="card__title">{props.title}</h3>
    </li>
  );
};

export default ItemCard;
