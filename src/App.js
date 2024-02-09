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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemModal: { opened: false, itemInfo: { title: NaN, link: NaN } },
    };
  }

  changeModalInfo(){
    // update the state spicifcly itemInfo;
  }

  toggleModal = (title, link) => {
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
        <ItemModal
          toggleModal={this.toggleModal}
          opened={this.state.ItemModal.opened}
          itemName={this.state.ItemModal.itemInfo.title}
          itemCategory=""
          itemImageUrl={this.state.ItemModal.itemInfo.link}
        ></ItemModal>

        <Header
          button={<AddClothsButton></AddClothsButton>}
          logoImageUrl="../src/components/Logo.svg"
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
          form={
            <ModalWithForm
              title=""
              name=""
              className={`modal modal_type_${this.props.name}`} //last two can go in form
              buttonText=""
              onClose=""
            ></ModalWithForm>
          }
        ></Main>
        <Footer developerName={"Developed by Obbie"} year={2024}></Footer>
      </div>
    );
  }
}

export default App;
