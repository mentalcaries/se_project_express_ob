import "../blocks/App.css";
import "../index.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import ItemCard from "./ItemCard";
import AddClothsButton from "./AddClothsButton";
import WeatherCard from "./WeatherCard";
import ModalWithForm from "./ModalWithForm";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { fetchApiInfo } from "../utils/WeatherApi";
import * as Constants from "../utils/constants";

const App = () => {
  const [itemModal, setItemModal] = useState({
    opened: false,
    itemInfo: { title: "NaN", link: "NaN", category: "NaN" },
  });
  const [addModal, setAddModal] = useState({ opened: false });
  const [weatherData, setWeatherData] = useState("NaN");
  const [temperature, setTemperature] = useState("NaN");
  // {onclick for the input elements will trigger a setUse state}
  const [formData, setFormData] = useState({ 
    name: "", // Initialize state for input values
    imageUrl: "",
    temperature: "", // Initialize state for radio button value
  });


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

  const openAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: true }));
  };

  const onClose = (title, link, category) => {
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
      <ModalWithForm
      submitHandler={""}
        className={`modal modal_type_`} //last two can go in form
        onClose={() => closeAddModal()}
        state={addModal.opened}
        inputElements={
          "we are going to map through this and return a react component"
        }
      ></ModalWithForm>
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
        button={
          <AddClothsButton onclick={() => openAddModal()}></AddClothsButton>
        }
        logoImageUrl="../src/components/Logo.svg"
        location={weatherData.name}
      ></Header>
      <Main
        cardTemplate={() => {
          return Constants.defaultClothingItems.map((item) => {
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
                    onClose(x, y, z);
                  }}
                ></ItemCard>
              );
            }
          });
        }}
        weatherCards={<WeatherCard temp={temperature}></WeatherCard>}
      ></Main>
      <Footer developerName={"Developed by Obbie"} year={2024}></Footer>
    </div>
  );
};

export default App;


{/* <label>Name</label>
        <input
          className="form__text-input"
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        ></input>
        <label>Image</label>
        <input
          className="form__text-input"
          type="url"
          placeholder="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="hot_button">
          <input
          id="hot_button"
            className="form__radio-input"
            type="radio"
            name="temperature"
            value="Hot"
            checked={formData.temperature === "Hot"}
            onChange={handleRadioChange}
          />
          {"Hot"}
        </label>
        <label htmlFor="warm_button">
          <input
          id="warm_button"
            className="form__radio-input"
            type="radio"
            name="temperature"
            value="Warm"
            checked={formData.temperature === "Warm"}
            onChange={handleRadioChange}
          />
          {"Warm"}
        </label>
        <label htmlFor="cold_button">
          <input
          id="cold_button"
            className="form__radio-input"
            type="radio"
            name="temperature"
            value="Cold"
            checked={formData.temperature === "Cold"}
            onChange={handleRadioChange}
          />
          {"Cold"}
        </label> */}
