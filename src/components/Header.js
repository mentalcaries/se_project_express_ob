import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import profileLogo from "../images/terrence.svg";
import companyLogo from "../images/Logo.svg";
import CurrentTemperatureUnitContext from "../context/CurrentTemperatureUnitContext"
import ToggleSwitch from './ToggleSwitch';

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const returnImage = (link, alt, id = "", className = "") => {
  return <img src={link} alt={alt} id={id} className={className} />;
};

const Header = (props) => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

  return (
    <header className="header">
      <div className="header__section">
        <Link to="/" className="header__text">{returnImage(companyLogo, "Company Logo")}</Link>
        <p className="header__text header__text_margin_left">
          {currentDate}, {props.location}
        </p>
      </div>

      <div className="header__section header__section_margin_left">
        <label className="header__switch">

          <input type="checkbox" onClick={() => {

            { handleToggleSwitchChange() };

          }} className="header__switch-checkbox"></input>
          <ToggleSwitch tempUnit={currentTemperatureUnit}></ToggleSwitch>
          {props.toggleButton}
        </label>

        {props.addButton}
        <Link className="header__link" to="/profile">
          <h3 className="header__text">Terrence tegegne</h3>

          {returnImage(profileLogo, "Profile Logo", "", "header__profile-image")}
        </Link>

      </div>
    </header>
  );
};

export default Header;
