import "./Styles/App.css";
import "./Styles/index.css";
import React, { Component } from "react";
import { Header } from "./blocks/Header";
import { Main } from "./blocks/Main";
import { ItemCard } from "./components/ItemCard";
import { AddClothsButton } from "./components/AddClothsButton";
import { WeatherCard } from "./components/WeatherCard";
import { ModalWithForm } from "./components/ModalWithForm";
import { Footer } from "./blocks/Footer";
import { ItemModal } from "./components/ItemModal";
import * as Constants from "./Constants";

// apis, useEffects, unified function that changes the state of AddModal, submit action that updates the apis and

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemModal: { opened: false, itemInfo: { title: NaN, link: NaN } },
      AddModal: { opened: false }, // modal with form
      weatherData: NaN
    };
  }

  componentDidMount() {
    // Fetch weather data when the component is mounted
    this.fetchApiInfo().then((data) =>{
      this.state.weatherData = data;
    })
  }

  fetchApiInfo() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${22.890533}&lon=${-109.916740}&units=imperial&appid=c35029a909644511423a38bc732f0bc2`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming response is JSON data
      })
      .then((data) => {
        // Handle the fetched data
        console.log(data);
        return (data)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }

  addModalSubmitHandler() {}

  closeAddModal() {
    this.setState((prevState) => ({
      ...prevState, // Preserve the existing state
      AddModal: {
        ...prevState.AddModal, // Preserve the existing AddModal state
        opened: false, // Set the opened property to true
      },
    }));
  }

  openAddModal() {
    this.setState((prevState) => ({
      ...prevState, // Preserve the existing state
      AddModal: {
        ...prevState.AddModal, // Preserve the existing AddModal state
        opened: true, // Set the opened property to true
      },
    }));
  }

  changeModalInfo() {
    // corrisponding to the function bellow
    // update the state spicifcly itemInfo;
  }

  toggleModal = (title, link) => {
    // better name like in openAddModal
    console.log(this.state.ItemModal.itemInfo);
    console.log(this.state.ItemModal.itemInfo);

    if (
      this.state.ItemModal.itemInfo.title === title &&
      this.state.ItemModal.itemInfo.link === link
    ) {
      console.log("Item info unchanged");
    }

    if (!this.state.ItemModal.opened || true) {
      this.setState((prevState) => ({
        ItemModal: {
          ...prevState.ItemModal,
          itemInfo: {
            title: title,
            link: link,
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
          itemCategory=""
          itemImageUrl={this.state.ItemModal.itemInfo.link}
        ></ItemModal>

        <Header
          button={
            <AddClothsButton
              onclick={() => {
                this.openAddModal();
                console.log(this.state.AddModal.opened);
                
              }}
            ></AddClothsButton>
          }
          logoImageUrl="../src/components/Logo.svg"
          location={
            this.state.weatherData.name
          }
        ></Header>
        <Main
          cardTemplate={() => {
            return Constants.defaultClothingItems.map((item) => {
              return (
                <ItemCard
                  cardId={item._id}
                  name={item.name}
                  imageUrl={item.link}
                  handleClick={(x, y) => {
                    this.toggleModal(x, y);
                  }}
                ></ItemCard>
              );
            });
          }}
          weatherCards={<WeatherCard></WeatherCard>}
        ></Main>
        <Footer developerName={"Developed by Obbie"} year={2024}></Footer>
      </div>
    );
  }
}

export default App;
