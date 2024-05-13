import "../blocks/App.css";
import "../index.css";
import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import AddClothsButton from "./AddClothsButton";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { fetchApiInfo } from "../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext"
import { CurrentCardsContext } from "../context/CardsContext";
import { Profile } from "./Profile"
import AddItemModal from "./AddItemModal";
import * as Constants from "../utils/constants";
import { DeleteModal } from "./DeleteModal";

// item modal needs to scale better when screen size changes 
// weather card needs to scale apropriatly
// we have overlaing css props specificly the modals

const App = () => {
  const [itemModal, setItemModal] = useState({
    opened: false,
    itemInfo: { id: "NaN", title: "NaN", link: "NaN", category: "NaN" },
  });
  const [deleteModal, setDeleteModal] = useState({opened: false})
  const [addModal, setAddModal] = useState({ opened: false });
  const [weatherData, setWeatherData] = useState("NaN");
  const [temperature, setTemperature] = useState("NaN");
  const [currentTemperatureUnit, setCurrentTempUnit] = useState("F");
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

  const closeDeleteModal = () =>{
    setDeleteModal({opened: false})
  }

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTempUnit("C"):
      setCurrentTempUnit("F");

  }

  const openAddModal = () => {
    setAddModal((prevAddModal) => ({ ...prevAddModal, opened: true }));
  };

  const toggleItemModal = (id, title, link, category) => {
    console.log(id);
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
        <CurrentCardsContext.Provider value={{cards, setClothingItems}}>

        <DeleteModal
          onClose={closeDeleteModal}
          state={deleteModal.opened}
          executeDelete={()=>{removeCardById(itemModal.itemInfo.id)}}
        >
        </DeleteModal>
        <AddItemModal
          state={addModal.opened}
          onClose={() => { closeAddModal() }}
          className={`modal modal_type_`}
          title={"New Garement"}
          buttonText={"Add Garement"}
        >
        </AddItemModal>

        <ItemModal
          onClose={() => {
            closeItemModal();
          }}
          handleDelete={()=>{setDeleteModal({opened: true})}}
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
