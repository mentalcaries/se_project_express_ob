import React, { Component } from 'react';
import { AddClothsButton } from '../components/AddClothsButton';
import '../Styles/Header.css'
const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

class Header extends Component{
    
    render(){
        return(
            <header className='header'>
                    <ul className='header__section'>
                        <li><img src={this.props.logoImageUrl} alt="header logo"></img></li>
                        <li className='header__text'>{currentDate}, {"location"}</li>

                    </ul>

                    <ul className='header__section'>
                        <li>
                            <AddClothsButton></AddClothsButton>
                        </li>
                        <li className='header__text'>Terrence tegegne</li>
                        <li className="">
                            <img src="src/components/terrance.svg" alt="profile logo"></img>
                        </li>
                    </ul>
            </header>
        )
    }
};

export {Header}
