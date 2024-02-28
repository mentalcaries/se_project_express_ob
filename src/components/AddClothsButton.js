import React from 'react';

const AddClothsButton = (props) => {
  return (
    <button onClick={props.onclick} className='header__add-button header__text'>+ Add Cloths</button>
  );
};

export { AddClothsButton };
