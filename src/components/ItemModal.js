import React from "react";

const ItemModal = (props) => {

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };
  
  return (
    <div className={`modal ${props.opened ? "" : "modal_close"}`} onClick={handleModalClick}>
      <div className="modal__container">
        <button
          className={"modal__close-button"}
          onClick={props.onClose}
        ></button>
        <img
          className="modal__image"
          src={props.itemImageUrl ? props.itemImageUrl : "NaN"}
          alt={props.itemName ? props.itemName : "NaN"}
        />
        <div className="modal__sub-container">
          <h3 className="modal__text">{props.itemName}</h3>
          <h3 className="modal__text">{`Weather: ${props.itemCategory}`}</h3>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
