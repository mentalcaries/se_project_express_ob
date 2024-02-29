import React from "react";

const ItemModal = (props) => {
  return (
    <div className={`modal ${props.opened ? "" : "modal_close"}`}>
      <div className="modal__container">
        <button
          className={"modal__close-button"}
          onClick={props.toggleModal}
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
