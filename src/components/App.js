import "../blocks/App.css";
import "../index.css";
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { ItemCard } from "./ItemCard";
import { AddClothsButton } from "./AddClothsButton";
import { WeatherCard } from "./WeatherCard";
import { ModalWithForm } from "./ModalWithForm";
import { Footer } from "./Footer";
import { ItemModal } from "./ItemModal";
import { fetchApiInfo } from "./WeatherApi";
import * as Constants from "../utils/constants";

const App = () => {
  const [itemModal, setItemModal] = useState({
    opened: false,
    itemInfo: { title: "NaN", link: "NaN", category: "NaN" },
  });
  const [addModal, setAddModal] = useState({ opened: false });
  const [weatherData, setWeatherData] = useState("NaN");
  const [temperature, setTemperature] = useState("NaN");

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

  const inputData = [
    {
      className: "form__text-input",
      type: "text",
      placeholder: "Name",
      name: "name",
    },
    {},
  ];

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    temperature: "",
  });

  // Function to handle form submission
  const handleSubmit = (data) => {
    // Process the form data (e.g., submit to an API)
    console.log("Form data submitted:", data);
    // Close the modal
    setAddModal(false);
  };

  const closeItemModal = () => {
    setItemModal((prevItemModal) => ({
      ...prevItemModal,
      opened: false,
    }));
  };

  const input = (props) => {
    return (
      <label>
        <input
          className={props.className}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={""}
        ></input>
      </label>
    );
  };

  const closeAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: false }));
  };

  const openAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: true }));
  };

  const toggleModal = (title, link, category) => {
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
        // inputs={() => {
        //   inputData.map((item) => {
        //     return (
        //       <input
        //         className={item.className}
        //         type={item.type}
        //         placeholder={item.placeholder}
        //         name={item.name}
        //         value={item.value}
        //         onChange={""}
        //       ></input>
        //     );
        //   });
        // }}
        className={`modal modal_type_`} //last two can go in form
        onclose={() => closeAddModal()}
        state={addModal.opened}
      ></ModalWithForm>
      <ItemModal
        toggleModal={() => {
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
                    toggleModal(x, y, z);
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
