import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from './ModalWithForm';
import CurrentCardsContext from "../context/CardsContext";
import useEscape from "../utils/useEscape";

const AddItemModal = (props) => {
  const { cards, setClothingItems } = useContext(CurrentCardsContext);
  const [modalData, setModalData] = useState({ _id: 17, "name": "", "weather": "", "imageUrl": "" });

  function findArrayDifference(avalableIds, usedIds) {
    const difference = avalableIds.filter(x => !usedIds.includes(x));
    return difference;
  }

  function findId(arr) {
    let stableCount = 1;
    let usedIds = [];
    let avalableIds = [];
    for (let i = 1; i <= arr.length + 1; i++) {
      avalableIds.push(i)
    }
    for (let item of arr) {
      stableCount += 1;
      usedIds.push(item._id);
    }
    return findArrayDifference(avalableIds, usedIds)[0];
  }

  useEscape(AddItemModal, props.onClose);

  useEffect(() => {
    if (props.state === true) {
      setModalData({ _id: findId(cards), "name": NaN, "weather": NaN, "imageUrl": NaN });
    }
  }, [props.state]);

  const handleInputChange = (event, name) => {
    modalData[name] = event.target.value;
  };

  const submitFunction = () => {
    props.apiAdd(modalData).then((results) => {
      setClothingItems(prevState => ([
        ...prevState,
        modalData
      ]))
    }).then(() => {
      props.onClose()
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
      handleInputChange={handleInputChange}
    >
    </ModalWithForm>
  );
};

export default AddItemModal;
