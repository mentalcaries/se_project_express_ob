import React, { Component } from 'react';
import closeImage from "../images/close-button.svg";

class ItemModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`modal ${this.props.opened ? "" : "modal_close"}`}>
                <div className='modal__container'>
                    <button className={"modal__close-button"} onClick={
                        (e) =>{
                            this.props.toggleModal();
                        }
            
                    } src={closeImage}></button>
                    <img className='modal__image' src={this.props.itemImageUrl}></img>
                    <div className='modal__sub-container'>
                        <h3 className='modal__text'>{this.props.itemCategory}</h3>
                        <h3 className='modal__text'>{this.props.itemName}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export { ItemModal };
