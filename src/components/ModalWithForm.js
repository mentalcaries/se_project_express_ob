import React, { useRef } from "react";
import useEscape from "../utils/useEscape";

const ModalWithForm = (props) => {

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };
  useEscape(props.onClose);


  return (
    <div className={`modal ${props.state ? "" : "modal_close"}`} onClick={handleModalClick}>
      <form className="form" onSubmit={(event) => {
        event.preventDefault();
        props.submitHandler();
      }}>
        <button
          type="button"
          className="form__close-button"
          onClick={() => {
            props.onClose();
          }}
        ></button>

        <h3>{props.title}</h3>

        {props.children}

        <button className="form__submit-button" type="submit">
          {props.buttonText}
        </button>
      </form>
    </div>
  );
};

export default ModalWithForm;
