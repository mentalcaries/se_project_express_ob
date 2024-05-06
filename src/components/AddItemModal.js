import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from './ModalWithForm';
import * as Constants from "../utils/constants";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = (props) => {
  const [modalData, setModalData] = useState({ "name": NaN, "imageUrl": NaN, "temperature": NaN });

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
          onChange={props.onchange}
          onClick={props.onclick}
          id={props.id}
        ></input>
      </label>
    );
  };

  useEffect(() => {
    if (props.state === true) {
      setModalData({ "name": NaN, "imageUrl": NaN, "temperature": NaN })
    }
  }, [props.state]);

  function handleChange(event) {
    console.log(event.target);
    console.log(modalData);
  }

  const handleInputChange = (name) => {
    console.log(modalData[String(name)])
    // then set the name to event.target.value

  };

  return (
    <ModalWithForm
      submitHandler={props.submitHandler}
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
              value={modalData[item.value]}
              onChange={() => { handleInputChange(item.name) }}
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
