import React, { Component } from 'react';

class AddClothsButton extends Component{
    constructor(props) {
        super(props);
      }
    
    render(){
        
        return(
            <button onClick={this.props.onclick}className='header__add-button header__text'>+ Add Cloths</button>
        )

    }
}

export {AddClothsButton}