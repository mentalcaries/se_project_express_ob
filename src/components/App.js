import "../blocks/App.css";
import "../index.css";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Switch, NavLink } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import AddClothsButton from "./AddClothsButton";
import WeatherCard from "./WeatherCard";
import ModalWithForm from "./ModalWithForm";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { fetchApiInfo } from "../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext"
import { Profile } from "./Profile"
import AddItemModal from "./AddItemModal";
import * as Constants from "../utils/constants";

// item modal needs to scale better when screen size changes  
// the cards needs to be apart of the state vars amnd use effect goes of the state variabless and then an api request 
// weather card needs to scale apropriatly

const InputComponent = (props) => {
  return (
    <label className={props.labelClassName}>
      {props.labelName}
      <input
        className={props.inputClassName}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onchange}
        onClick={props.onclick}
        id={props.id}
      ></input>
    </label>
  );
};

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
        {/* <ModalWithForm
          submitHandler={() => {
            closeAddModal();
          }}
          className={`modal modal_type_`}
          onClose={() => closeAddModal()}
          state={addModal.opened}
          title={"New Garement"}
          buttonText={"Add Garement"}
          children={(name, image, weather) => {
            return inputElements.map((item) => {
              return (
                <InputComponent
                  key={item.id}
                  labelName={item.labelName}
                  id={item.id}
                  labelClassName={item.labelClassName}
                  inputClassName={item.inputClassName}
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  value={item.value}
                  onChange={item.onChange}
                  onClick={item.onClick}
                ></InputComponent>
              );
            });
          }}
        ></ModalWithForm> */}

        <AddItemModal
          state={addModal.opened}
          onClose={() => { closeAddModal() }}
          className={`modal modal_type_`}
          submitHandler={NaN}
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
      </CurrentTemperatureUnitContext.Provider>

    </div>
  );
};

export default App;
