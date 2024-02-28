
import React, { useState } from "react";

const ModalWithForm = (props) => {
  const [formData, setFormData] = useState({
    name: "", // Initialize state for input values
    imageUrl: "",
    temperature: "", // Initialize state for radio button value
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Update state when input values change
  };

  const handleRadioChange = (event) => {
    setFormData({ ...formData, temperature: event.target.value });
  };

  const closeModal = () => {
    props.onclose();
  };

  const submit = (event) => {
    event.preventDefault();
    console.log(formData.name);
    console.log(formData.imageUrl);
    console.log(formData.temperature);
    closeModal();

    // Use formData.name, formData.imageUrl, and formData.temperature for form data submission
    // Add to API
  };

  return (
    <div className={`modal ${props.state ? "" : "modal_close"}`}>
      <form className="form">
        <button
          className="form__close-button"
          onClick={(event) => {
            event.preventDefault();
            closeModal();
          }}
        ></button>
        <h3>New garment</h3>
        <label>Name</label>
        <input
          className="form__text-input"
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        ></input>
        <label>Image</label>
        <input
          className="form__text-input"
          type="url"
          placeholder="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleInputChange}
        ></input>
        <label>
          <input
            className="form__radio-input"
            type="radio"
            name="temperature"
            value="Hot"
            checked={formData.temperature === "Hot"}
            onChange={handleRadioChange}
          />
          {"Hot"}
        </label>
        <label>
          <input
            className="form__radio-input"
            type="radio"
            name="temperature"
            value="Warm"
            checked={formData.temperature === "Warm"}
            onChange={handleRadioChange}
          />
          {"Warm"}
        </label>
        <label>
          <input
            className="form__radio-input"
            type="radio"
            name="temperature"
            value="Cold"
            checked={formData.temperature === "Cold"}
            onChange={handleRadioChange}
          />
          {"Cold"}
        </label>
        <input
          className="form__submit-button"
          type="submit"
          value="Submit"
          onClick={submit}
        ></input>
      </form>
    </div>
  );
};

export { ModalWithForm };
