import React from "react";

const ModalWithForm = (props) => {

  const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  return (
    <div className={`modal ${props.state ? "" : "modal_close"}`} onKeyDown={props.onKeyDown} onClick={handleModalClick}>
      <form className="form" onSubmit={(event) => {
        event.preventDefault();
        props.submitHandler()
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
