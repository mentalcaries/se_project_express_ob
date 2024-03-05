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

// things we have to do, we have to set a class names and classes so that they can be univeral accross the board 

const InputComponent = (
  id,
  labelName,
  labelClassName,
  inputClassName,
  type,
  placeholder,
  name,
  value,
  onchange,
  onclick
) => {
  return (
    <label className={'labelClassName'}>
      {'labelName'}
      <input
        className={'inputClassName'}
        type={'type'}
        placeholder={'placeholder'}
        name={name}
        value={'value'}
        onChange={'onchange'}
        onClick={'onclick'}
        id={'id'}
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
  // {onclick for the input elements will trigger a setUse state}
  const [formData, setFormData] = useState({
    name: "", // Initialize state for input values
    imageUrl: "",
    temperature: "", // Initialize state for radio button value
  });

  const inputElements = [
    {
      id: "",
      labelName: "Name",
      labelClassName: "",
      inputClassName: "form__text-input",
      type: "text",
      placeholder: "Name",
      name: "Name",
      value: "name",
      onChange: ""
    },
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
              id={item.id}
              labelName={item.labelName}
              labelClassName={item.labelClassName}
              inputClassName={item.inputClassName}
              type={item.type}
              placeholder={item.placeholder}
              name={item.name}
              value={item.value}
              onChange={item.onChange}
              onClick={item.onclick}
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
