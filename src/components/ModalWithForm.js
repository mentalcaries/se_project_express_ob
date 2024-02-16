import React, { Component } from "react";

class ModalWithForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "", // Initialize state for input values
      imageUrl: "",
      temperature: "", // Initialize state for radio button value
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }); // Update state when input values change
  };

  handleRadioChange = (event) => {
    this.setState({ temperature: event.target.value });
  };

  closeModal = () => {
    this.props.onclose();
  };

  submit = (event) => {
    event.preventDefault();
    console.log(this.state.name);
    console.log(this.state.imageUrl);
    console.log(this.state.temperature);
    this.closeModal();

    // Use this.state.name, this.state.imageUrl, and this.state.temperature for form data submission
    //add to api
  };

  render() {
    return (
      <div className={`modal ${this.props.state ? "" : "modal_close"}`}>
        <form className="form">
          <button
            className="form__close-button"
            onClick={(event) => {
              event.preventDefault();
              this.closeModal();
            }}
          ></button>
          <h3>New garment</h3>
          <label>Name</label>
          <input
            className="form__text-input"
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          ></input>
          <label>Image</label>
          <input
            className="form__text-input"
            type="url"
            placeholder="Image URL"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleInputChange}
          ></input>
          <label>
            <input
              className="form__radio-input"
              type="radio"
              name="temperature"
              value="Hot"
              checked={this.state.temperature === "Hot"}
              onChange={this.handleRadioChange}
            />
            {"Hot"}
          </label>
          <label>
            <input
              className="form__radio-input"
              type="radio"
              name="temperature"
              value="Warm"
              checked={this.state.temperature === "Warm"}
              onChange={this.handleRadioChange}
            />
            {"Warm"}
          </label>
          <label>
            <input
              className="form__radio-input"
              type="radio"
              name="temperature"
              value="Cold"
              checked={this.state.temperature === "Cold"}
              onChange={this.handleRadioChange}
            />
            {"Cold"}
          </label>
          <input
            className="form__submit-button"
            type="submit"
            value="Submit"
            onClick={this.submit}
          ></input>
        </form>
      </div>
    );
  }
}

export { ModalWithForm };
