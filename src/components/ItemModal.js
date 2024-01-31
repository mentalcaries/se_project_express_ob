import React, { Component } from 'react';
import closeImage from "../images/close-button.svg"

class ItemModal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            // <div>modal</div>
            <div className='modal__container'>
                <button class="modal__close-button" src={closeImage}></button>
                <img className='modal__image' src={this.props.itemName}></img>
                <div className='modal__sub-container'>
                    <h3 className='modal__text'>{this.props.itemCategory}</h3>
                    <h3 className='modal__text'>{this.props.itemImageUrl}</h3>
                </div>
            </div>
        )
    }
}

export {ItemModal};

