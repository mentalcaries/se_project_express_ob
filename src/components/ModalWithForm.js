import React from "react";

const ModalWithForm = (props) => {
  return (
    <div className={`modal ${props.state ? "" : "modal_close"}`}>
      <form className="form" onSubmit={(event) =>{
        props.submitHandler()
        event.preventDefault();
      }}>
        <button
          className="form__close-button"
          onClick={(event) => {
            props.onClose();
            event.preventDefault();
          }}
        ></button>

        <h3>{props.title}</h3>

        {props.children()}

        <button className="form__submit-button" type="submit">
          {props.buttonText}
        </button>
      </form>
    </div>
  );
};

export default ModalWithForm;
