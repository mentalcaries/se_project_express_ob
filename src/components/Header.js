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
      <div className='header__section'>
        <h3 className='header__text'>{returnImage(companyLogo)}</h3>
        <p className='header__text header__text_margin_left'>{currentDate}, {props.location}</p>
      </div>

      <div className='header__section header__section_margin_left'>
          {props.button}
        <h3 className='header__text'>Terrence tegegne</h3>
        <img className="header__profile-image" src={profileLogo}>
        </img>
      </div>
    </header>
  )
};

export default Header;
