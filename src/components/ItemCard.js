import React, { Component } from 'react';
class ItemCard extends Component{
    constructor(props) {
        super(props);
      }
      
    render(){
        return(
            <li className='card'>
                <img className='card__image' src="../"></img>
                <h3 className='card__title' > {this.props.title}</h3>
            </li>
        )
    }

}

export { ItemCard }