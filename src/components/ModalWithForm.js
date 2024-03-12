
import React, { useEffect } from "react";


const ModalWithForm = (props) => {

  return (
    <div className={`modal ${props.state?"":"modal_close"}`}>
    <form className="form" onSubmit={props.submitHandler}>
    <button className="form__close-button" onClick={
      (event) => {
        event.preventDefault();
        props.onClose()
      }
    }></button>

    <h3>{props.title}</h3>

      {props.inputElements()}

      <button onClick={
        (event) =>{
          event.preventDefault();
          props.onClose();
        }
      } className="form__submit-button" type="submit"> {props.buttonText} </button>
    </form>

    </div>
    
  );
};

export default ModalWithForm;
