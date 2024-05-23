import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from './ModalWithForm';
import * as Constants from "../utils/constants";
import CurrentCardsContext from "../context/CardsContext";

const AddItemModal = (props) => {
  const { cards, setClothingItems } = useContext(CurrentCardsContext);
  const [idCounter, setIdCounter] = useState(cards.length);
  const [modalData, setModalData] = useState({ _id: idCounter, "name": NaN, "weather": NaN, "imageUrl": NaN });

  function arrayDifference(avalableIds, usedIds) {
    const difference1 = avalableIds.filter(x => !usedIds.includes(x));
    return difference1;
  }

  function findId(arr) {
    let stableCount = 1
    let usedIds = []
    let avalableIds =[]
    for (let i = 1; i <= arr.length + 1; i++){
      avalableIds.push(i)
    }
    for (let item of arr){
      stableCount += 1;
      usedIds.push(item._id);
  }
  
  if (arrayDifference(avalableIds, usedIds).length >= 1){
    return arrayDifference(avalableIds, usedIds)[0]
  }
}

  const InputComponent = (props) => {
  
    findId(cards);
    return (
      <label className={props.labelClassName}>
        {props.labelName}
        <input
          required={true}
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
      setModalData({ _id: findId(cards), "name": NaN, "weather": NaN, "imageUrl": NaN });
    }
  }, [props.state]);

  const handleInputChange = (event, name) => {
    modalData[name] = event.target.value;
  };

  const submitFunction = () =>{
      props.apiAdd(modalData).then((results) => {
        setClothingItems(prevState => ([
          ...prevState,
          modalData
        ]));

        setIdCounter(prevCounter => prevCounter * 3)
        { props.onClose() }
      }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitFunction();
    }
  }

  return (
    <ModalWithForm
      submitHandler={submitFunction}
      onKeyDown={handleKeyDown}
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
