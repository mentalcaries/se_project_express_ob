import "../blocks/App.css";
import "../index.css";
import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import AddClothsButton from "./AddClothsButton";
import WeatherCard from "./WeatherCard";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { fetchApiInfo } from "../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext"
import { CurrentCardsContext } from "../context/CardsContext";
import { Profile } from "./Profile"
import AddItemModal from "./AddItemModal";
import * as Constants from "../utils/constants";

// item modal needs to scale better when screen size changes  
// weather card needs to scale apropriatly

const App = () => {
  const [itemModal, setItemModal] = useState({
    opened: false,
    itemInfo: { title: "NaN", link: "NaN", category: "NaN" },
  });
  const [addModal, setAddModal] = useState({ opened: false });
  const [weatherData, setWeatherData] = useState("NaN");
  const [temperature, setTemperature] = useState("NaN");
  const [CurrentTemperatureUnit, setCurrentTempUnit] = useState("F");
  const [cards, setClothingItems] = useState(Constants.defaultClothingItems);
  console.log(cards);

  useEffect(() => {
    fetchApiInfo()
      .then((data) => {
        setWeatherData(data);
        setTemperature(data.main.temp);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const closeItemModal = () => {
    setItemModal((prevItemModal) => ({
      ...prevItemModal,
      opened: false,
    }));
  };

  const closeAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: false }));
  };

  const handleTemperatureUnitChange = () => {
    CurrentTemperatureUnit === "F"
      ? setCurrentTempUnit("C") :
      setCurrentTempUnit("F");

  }

  const openAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: true }));
  };

  const toggleItemModal = (title, link, category) => { // better name
    setItemModal((prevItemModal) => ({
      ...prevItemModal,
      itemInfo: {
        title: title,
        link: link,
        category: category,
      },
      opened: !prevItemModal.opened,
    }));
  };

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider value={{ CurrentTemperatureUnit, handleTemperatureUnitChange, temperature }}>
        <CurrentCardsContext.Provider value={{cards, setClothingItems}}>

        <AddItemModal
          state={addModal.opened}
          onClose={() => { closeAddModal() }}
          className={`modal modal_type_`}
          submitHandler={(items) => {
            setClothingItems(prevState => ({
              ...prevState,
              items
            }))
          }}
          title={"New Garement"}
          buttonText={"Add Garement"}
        >
        </AddItemModal>

        <ItemModal
          onClose={() => {
            closeItemModal();
          }}
          opened={itemModal.opened}
          itemName={itemModal.itemInfo.title}
          itemCategory={itemModal.itemInfo.category}
          itemImageUrl={itemModal.itemInfo.link}
        ></ItemModal>

        <Header
          addButton={
            <AddClothsButton onclick={() => openAddModal()}></AddClothsButton>
          }
          logoImageUrl="../src/components/Logo.svg"
          location={weatherData.name}
        ></Header>
        <Switch>
          <Route exact path="/">
            <Main
              cardContent={cards}
              toggleItemModal={toggleItemModal}
              weatherCards={<WeatherCard></WeatherCard>}
            ></Main>
          </Route>
          <Route path="/profile">
            <Profile
              cardContent={cards}
              addButton={<AddClothsButton onclick={() => openAddModal()} className={"profile__items-AddButton"}></AddClothsButton>}
              toggleItemModal={toggleItemModal}
            ></Profile>
          </Route>
        </Switch>

        <Footer developerName={"Developed by Obbie"} year={2024}></Footer>
      </CurrentCardsContext.Provider>
      </CurrentTemperatureUnitContext.Provider>

    </div>
  );
};

export default App;
