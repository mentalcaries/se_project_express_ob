import React, { useRef } from "react";
import useEscape from "../utils/useEscape";

const ModalWithForm = (props) => {
  const modalRef = useRef(null);
  useEscape(modalRef, props.onClose);

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };


  return (
    <div className={`modal ${props.state ? "" : "modal_close"}`} ref={modalRef} onClick={handleModalClick}>
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

        {props.modalInputContent}

        <button className="form__submit-button" type="submit">
          {props.buttonText}
        </button>
      </form>
    </div>
  );
};

export default ModalWithForm;
