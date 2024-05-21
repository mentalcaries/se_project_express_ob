import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from './ModalWithForm';
import * as Constants from "../utils/constants";
import CurrentCardsContext from "../context/CardsContext";


const AddItemModal = (props) => {
  const [idCounter, setIdCounter] = useState(17);
  const [modalData, setModalData] = useState({ _id: idCounter, "name": NaN, "weather": NaN, "imageUrl": NaN });
  const { cards, setClothingItems } = useContext(CurrentCardsContext);

  const InputComponent = (props) => {
    return (
      <label className={props.labelClassName}>
        {props.labelName}
        <input
          className={props.inputClassName}
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onClick={props.onclick}
          id={props.id}
        ></input>
      </label>
    );
  };

  useEffect(() => {
    if (props.state === true) {
      setModalData({ _id: idCounter, "name": NaN, "weather": NaN, "imageUrl": NaN });
    }
  }, [props.state]);

  const handleInputChange = (event, name) => {
    modalData[name] = event.target.value;
  };

  return (
    <ModalWithForm
      submitHandler={() => {
        props.apiAdd(modalData).then((results) => {
          setClothingItems(prevState => ([
            ...prevState,
            modalData
          ]));

          setIdCounter(prevCounter => prevCounter + 1)
          { props.onClose() }
        }).catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });

      }}
      className={props.className}
      onClose={props.onClose}
      state={props.state}
      title={props.title}
      buttonText={props.buttonText}
      children={(name, image, weather) => {
        return Constants.inputElements.map((item) => {
          return (
            <InputComponent
              key={item.id}
              labelName={item.labelName}
              id={item.id}
              labelClassName={item.labelClassName}
              inputClassName={item.inputClassName}
              type={item.type}
              placeholder={item.placeholder}
              name={item.name}
              value={item.value}
              onChange={(event) => { handleInputChange(event, item.name) }}
              onClick={(item.onClick)}
            ></InputComponent>
          );
        });
      }}
    >
    </ModalWithForm>
  );
};

export default AddItemModal;
