import React from "react";
import * as Constants from '../utils/constants'

const ModalWithForm = (props) => {

  const InputComponent = (props) => {

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

        {Constants.inputElements.map((item) => {
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
              onChange={(event) => { props.handleInputChange(event, item.name) }}
              onClick={(item.onClick)}
            ></InputComponent>
          );
        })}

        <button className="form__submit-button" type="submit">
          {props.buttonText}
        </button>
      </form>
    </div>
  );
};

export default ModalWithForm;
