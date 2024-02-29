import React from 'react';
import profileLogo from "../images/terrence.svg"
import companyLogo from "../images/Logo.svg"

const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

const returnImage = (link) => {
  return (
    <img src={link} alt="logo" />
  )
}

const Header = (props) => {
  return (
    <header className='header'>
      <ul className='header__section'>
        <li>{returnImage(companyLogo)}</li>
        <li className='header__text header__text_margin_left'>{currentDate}, {props.location}</li>
      </ul>

      <ul className='header__section header__section_margin_left'>
        <li>
          {props.button}
        </li>
        <li className='header__text'>Terrence tegegne</li>
        <li className="header__profile-image">
          {returnImage(profileLogo)}
        </li>
      </ul>
    </header>
  )
};

export default Header;
