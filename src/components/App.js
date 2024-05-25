import "../blocks/App.css";
import "../index.css";
import * as Constants from "../utils/constants";
import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import AddClothsButton from "./AddClothsButton";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import DeleteModal from "./DeleteModal";
import fetchApiInfo from "../utils/WeatherApi";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext"
import CurrentCardsContext from "../context/CardsContext";
import Profile from "./Profile"
import AddItemModal from "./AddItemModal";
import { getCards } from "../utils/api";
import { addCard } from "../utils/api";
import { deleteCard } from "../utils/api";

const App = () => {
  const [itemModal, setItemModal] = useState({
    opened: false,
    itemInfo: { id: "", title: "", link: "", category: "" }
  });
  const [deleteModal, setDeleteModal] = useState({ opened: false })
  const [addModal, setAddModal] = useState({ opened: false });
  const [weatherData, setWeatherData] = useState({});
  const [temperature, setTemperature] = useState(0);
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");
  const [cards, setClothingItems] = useState([]);

  useEffect(() => {
    getCards().then((results) => {
      setClothingItems(results);
    }).catch((response) => {
      console.error(response);
    });

  }, []);
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
    setItemModal((prevItemModal) => ({ ...prevItemModal, opened: false }));
  };

  const closeAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: false }));
  };

  const openAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: true }));
  };

  const closeDeleteModal = () => {
    setDeleteModal({ opened: false })
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTempUnit("C") :
      setCurrentTempUnit("F");

  }

  console.log(cards)

  const toggleItemModal = (id, title, link, category) => {
    setItemModal((prevItemModal) => ({
      ...prevItemModal,
      itemInfo: {
        id: id,
        title: title,
        link: link,
        category: category,
      },
      opened: !prevItemModal.opened,
    }));
  };

  const removeCardById = (idToRemove) => {
    setClothingItems(prevCards => prevCards.filter(card => card._id !== idToRemove));
  };

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <CurrentCardsContext.Provider value={{ cards, setClothingItems }}>

          <DeleteModal
            onClose={closeDeleteModal}
            state={deleteModal.opened}
            executeDelete={() => {
              return deleteCard(itemModal.itemInfo.id).then(() => {
                removeCardById(itemModal.itemInfo.id)
              });
            }}
          >
          </DeleteModal>
          <AddItemModal
            state={addModal.opened}
            onClose={() => { closeAddModal() }}
            className={`modal modal_type_`}
            title={"New Garement"}
            buttonText={"Add Garement"}
            apiAdd={addCard}
          >
          </AddItemModal>

          <ItemModal
            onClose={() => {
              closeItemModal();
            }}
            handleDelete={() => { setDeleteModal({ opened: true }) }}
            opened={itemModal.opened}
            itemId={itemModal.itemInfo.id}
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
                temperature={temperature}
                cardContent={cards}
                toggleItemModal={toggleItemModal}
              ></Main>
            </Route>
            <Route path="/profile">
              <Profile
                temperature={temperature}
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



