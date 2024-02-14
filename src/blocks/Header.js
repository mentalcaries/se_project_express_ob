import React, { Component } from 'react';
import profileLogo from "../images/terrence.svg"
import companyLogo from "../images/Logo.svg"

const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });


function returnImage(link) {
  return (
    <img src={link} />
  )
}

class Header extends Component{
        constructor(props) {
        super(props);
      }
    render(){
        return(
            <header className='header'>
                    <ul className='header__section'>
                        <li> {returnImage(companyLogo)}</li>
                        <li className='header__text header__text_margin_left'>{currentDate}, {this.props.location}</li>
                    </ul>

                    <ul className='header__section header__section_margin_left'>
                        <li>
                            {this.props.button}
                        </li>
                        <li className='header__text'>Terrence tegegne</li>
                        <li className="header__profile-image">
                            {returnImage(profileLogo)}
                        </li>
                    </ul>
            </header>
        )
    }
};

export {Header}
