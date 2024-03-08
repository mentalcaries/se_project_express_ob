
import React, { useEffect } from "react";


const ModalWithForm = (props) => {

  return (
    <div className={`modal ${props.state?"":"modal_close"}`}>
    <form className="form" onSubmit={props.submitHandler}> {/*the submit handler handles everything inside of App*/ }
    <button className="form__close-button" onClick={
      (event) => {
        event.preventDefault();
        props.onClose()
      }
    }></button>

    <h3>New Garment</h3>

      {props.inputElements()}

      <button onClick={
        (event) =>{
          event.preventDefault();
          props.onClose();
        }
      } className="form__submit-button" type="submit"> Add Garment </button>
    </form>

    </div>
    
  );
};

export default ModalWithForm;
