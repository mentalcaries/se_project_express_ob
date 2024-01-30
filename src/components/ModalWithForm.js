import React, { Component } from 'react';

class ModalWithForm extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        return(
            <form className='form'>
                <button className='form__close-button'></button>
                <h3>New garment</h3>
                <label>Name</label>
                <input type="text" placeholder="Name"></input>
                <label>Image</label>
                <input type="url" placeholder="Image URL"></input>
                <label for="Hot">Hot</label>
                <input type="radio" id="Hot" name="options" value="Hot"></input>
                <label for="Hot">Warm</label>
                <input type="radio" id="Warm" name="options" value="Warm"></input>
                <label for="Hot">Cold</label>
                <input type="radio" id="Cold" name="options" value="Cold"></input>
                <input type="submit" value='Submit'></input>
            </form>
        )
    }

}
export { ModalWithForm }