import React, { useContext } from 'react';
import profileLogo from "../images/terrence.svg";
import * as Constants from "../utils/constants";
import ItemCard from "./ItemCard";
import {CurrentTemperatureUnitContext} from "../context/CurrentTemperatureUnitContext"



const Profile = (props) =>{

    const {CurrentTemperatureUnit, handleTemperatureUnitChange, temperature} = useContext(CurrentTemperatureUnitContext);

  const cards = () => {
    return props.cardContent.map((item) => {
      const weatherCategory =
        temperature >= 86
          ? "hot"
          : temperature >= 66 && temperature <= 85
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
              props.toggleItemModal(x, y, z);
            }}
          ></ItemCard>
        );
      }
    });
  };

    const returnImage = (link, alt, id = "", className = "") => {
        return <img src={link} alt={alt} id={id} className={className} />;
      };

    return(
        <div className='profile'>
            <div className='profile__avatar'>
                <h3 className='profile__avatar-text'>Terrence Tegegne </h3>
                {returnImage(profileLogo, "Profile Logo","", "profile__logo")}
            </div>
            <div className='profile__items'>
            <div className='profile__items-header'>
                <h3 className='profile__items-text'>Your Items</h3>
                {props.addButton}
            </div>
            <div className='profile__items-cards'>{cards()}</div>

            </div>
        </div>
    )
}

export {Profile}
