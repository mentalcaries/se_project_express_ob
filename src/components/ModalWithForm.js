import React, { Component } from "react";

class ModalWithForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div class={`modal ${this.props.state?"":"modal_close"}`}>
        <form className="form">
          <button className="form__close-button" onClick={this.props.onclose}></button>
          <h3>New garment</h3>
          <label>Name</label>
          <input
            className="form__text-input"
            type="text"
            placeholder="Name"
          ></input>
          <label>Image</label>
          <input
            className="form__text-input"
            type="url"
            placeholder="Image URL"
          ></input>
          <label for="Hot">
            <input
              className=""
              type="radio"
              id="Hot"
              name="options"
              value="Hot"
            ></input>
            {"Hot"}
          </label>
          <label for="Warm">
            <input
              className=""
              type="radio"
              id="Warm"
              name="options"
              value="Warm"
            ></input>
            {"Warm"}
          </label>
          <label for="Cold">
            <input
              className="form__radio-input_margin-bottom_32px"
              type="radio"
              id="Cold"
              name="options"
              value="Cold"
            ></input>
            {"Cold"}
          </label>
          <input
            className="form__submit-button"
            type="submit"
            value="Submit"
          ></input>
        </form>
      </div>
    );
  }
}
export { ModalWithForm };
