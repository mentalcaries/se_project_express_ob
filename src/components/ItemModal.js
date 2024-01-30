import React, { Component } from 'react';

class ItemModal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(

            <div className='modal__container'>
                <img className='modal__image' src={this.props.itemName}></img>
                <div>
                    <h3>{this.props.itemCategory}</h3>
                    <h3>{this.props.itemImageUrl}</h3>
                </div>
            </div>
        )
    }
}

export {ItemModal};

