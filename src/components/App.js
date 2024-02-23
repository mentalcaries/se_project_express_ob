import "../blocks/App.css";
import "../index.css";
import React, { Component } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { ItemCard } from "./ItemCard";
import { AddClothsButton } from "./AddClothsButton";
import { WeatherCard } from "./WeatherCard";
import { ModalWithForm } from "./ModalWithForm";
import { Footer } from "./Footer";
import { ItemModal } from "./ItemModal";
import * as Constants from "../utils/constants";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemModal: { opened: false, itemInfo: { title: NaN, link: NaN, category:NaN} },
      AddModal: { opened: false }, // modal with form
      weatherData: NaN,
      temperature: NaN,
    };
  }

  componentDidMount() {
    this.fetchApiInfo().then((data) => {
      this.setState({ weatherData: data });
      this.setState({ temperature: data.main.temp });
    });
  }

  fetchApiInfo() { // you need to document your code
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${Constants.longitude}&lon=${Constants.latitude}&units=imperial&appid=c35029a909644511423a38bc732f0bc2`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }

  addModalSubmitHandler() {

  }

  // why cant the bottom functions be universal 

  closeAddModal() { // what modal, make it universal 

    this.setState((prevState) => ({
      ...prevState, // Preserve the existing state
      AddModal: {
        ...prevState.AddModal, // Preserve the existing AddModal state
        opened: false, // Set the opened property to true
      },
    }));
  }

  openAddModal() { // what modal, make it universal 
    this.setState((prevState) => ({
      ...prevState, // Preserve the existing state
      AddModal: {
        ...prevState.AddModal, // Preserve the existing AddModal state
        opened: true, // Set the opened property to true
      },
    }));
  }

  toggleModal = (title, link, category) => {
    if (!this.state.ItemModal.opened || true) {
      this.setState((prevState) => ({
        ItemModal: {
          ...prevState.ItemModal,
          itemInfo: {
            title: title,
            link: link,
            category: category
          },
          opened: !prevState.ItemModal.opened,
        },
      }));
    }
  };
  render() {
    return (
      <div className="App">
        <ModalWithForm
          title=""
          name=""
          className={`modal modal_type_${this.props.name}`} //last two can go in form
          buttonText=""
          onclose={() => {
            this.closeAddModal();
          }}
          state={this.state.AddModal.opened}
        ></ModalWithForm>
        <ItemModal
          toggleModal={this.toggleModal}
          opened={this.state.ItemModal.opened}
          itemName={this.state.ItemModal.itemInfo.title}
          itemCategory={this.state.ItemModal.itemInfo.category}
          itemImageUrl={this.state.ItemModal.itemInfo.link}
        ></ItemModal>

        <Header
          button={
            <AddClothsButton
              onclick={() => {
                this.openAddModal();
              }}
            ></AddClothsButton>
          }
          logoImageUrl="../src/components/Logo.svg"
          location={this.state.weatherData.name}
        ></Header>
        <Main
          cardTemplate={() => {
            return Constants.defaultClothingItems.map((item) => {

              const weatherCategory =
              this.state.temperature >= 86
                  ? "hot"
                  : this.state.temperature >= 66 && this.state.temperature <= 85
                    ? "warm"
                    : "cold";
              if (item.weather == weatherCategory){
                return (
                  <ItemCard
                    cardId={item._id}
                    name={item.name}
                    weather={item.weather}
                    imageUrl={item.link}
                    handleClick={(x, y, z) => {
                      this.toggleModal(x, y, z);
                    }}
                  ></ItemCard>
                );
              }
         
            });
          }}
          weatherCards={
            <WeatherCard temp={this.state.temperature}></WeatherCard>
          }
        ></Main>
        <Footer developerName={"Developed by Obbie"} year={2024}></Footer>
      </div>
    );
  }
}

export default App;
