import React, { Component } from 'react';

class ItemCard extends Component{
    constructor(props) {
        super(props);
      }
      
    render(){
        return(
            <li className='card' onClick={()=>{this.props.handleClick(this.props.name, this.props.imageUrl)}}>
                <img className='card__image' src={this.props.imageUrl}></img>
                <h3 className='card__title' > {this.props.title}</h3>
            </li>
        )
    }

}

export { ItemCard }