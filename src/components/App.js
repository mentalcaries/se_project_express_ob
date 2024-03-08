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


const InputComponent = (
  props
) => {
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


  const inputElements = [
    {
      id: "name-input",
      labelName: "Name",
      labelClassName: "form__text-label",
      inputClassName: "form__text-input",
      type: "text",
      placeholder: "Name",
      name: "Name",
      onChange: () => {},
      onClick: () => {}
    },
    {
      id: "url-input",
      labelName: "Image",
      labelClassName: "form__text-label",
      inputClassName: "form__text-input",
      type: "url",
      placeholder: "Image URL",
      name: "imageUrl",
      onChange: () =>{},
      onClick: () =>{}
    },
    {
      id: "hot button",
      labelName: "Hot",
      labelClassName: "form__radio-label",
      inputClassName: "form__radio-input",
      type: "radio",
      name: "temperature",
      value: "Hot",
      onChange: () =>{},
      onClick: () =>{}
    },
    {
      id: "warm-button",
      labelName: "warm",
      labelClassName: "form__radio-label",
      inputClassName: "form__radio-input",
      type: "radio",
      name: "temperature",
      value: "Warm",
      onChange: () =>{},
      onClick: () =>{}
    },
    {
      id: "cold-button",
      labelName: "cold",
      labelClassName: "form__radio-label",
      inputClassName: "form__radio-input",
      type: "radio",
      name: "temperature",
      value: "Cold",
      onChange: () =>{},
      onClick: () =>{}
    }

  ];

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
        submitHandler={() => {
          console.log("555");
        }}
        className={`modal modal_type_`} //last two can go in form
        onClose={() => closeAddModal()}
        state={addModal.opened}
        inputElements={() =>{
          return inputElements.map((item) =>{
            return(
              <InputComponent 
              key={item.id}
              id={item.id}
              labelName={item.labelName}
              labelClassName={item.labelClassName}
              inputClassName={item.inputClassName}
              type={item.type}
              placeholder={item.placeholder}
              name={item.name}
              value={item.value}
              onChange={item.onChange}
              onClick={item.onClick}
              ></InputComponent>
            )
          })
        }
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
