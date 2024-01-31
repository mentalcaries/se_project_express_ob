import "./Styles/App.css";
import "./Styles/index.css";
import React, { Component } from "react";
import { Header } from './blocks/Header';
import { Main } from "./blocks/Main";
import { ItemCard } from "./components/ItemCard";
import { AddClothsButton } from "./components/AddClothsButton";
import { WeatherCard } from "./components/WeatherCard"
import { ModalWithForm } from "./components/ModalWithForm"
import { Footer } from "./blocks/Footer"  
import { ItemModal } from "./components/ItemModal"
import * as Constants from "./Constants"

class App extends Component {
  // {dont forget the map and filter functions}
  render() {
    return (
      <div className="App">
        <Header button={<AddClothsButton></AddClothsButton>} logoImageUrl="../src/components/Logo.svg" ></Header>
        <Main cardTemplate={<ItemCard title="WhatWaaa" imageUrl="" handleClick =""></ItemCard>} weatherCards={<WeatherCard></WeatherCard>}
        modal={<ItemModal itemName="" itemCategory="" itemImageUrl=""></ItemModal>} 
        form={<ModalWithForm title="" name="" className={`modal modal_type_${this.props.name}`} //last two can go in form 
        buttonText="" onClose=""></ModalWithForm>}
        ></Main>
        <Footer developerName={"Developed by Obbie"} year={2024}></Footer>
      </div>
    );
  }
}  

export default App;
