import React, { useState, useEffect, useContext } from "react";

const DeleteModal = (props) =>{
    const handleModalClick = (event) => {
        if (event.target === event.currentTarget) {
          props.onClose();
        }
      };

    const handleDelete = () =>{
        props.onClose();
        props.executeDelete();
    }
    return(
        <div className={`modal ${props.state ? "" : "modal_close"}`} onClick={handleModalClick}>
            <div className="modal__container">
                <button className="modal__delete-close-button" onClick={props.onClose}></button>
                <h3 className="modal__delete-text">Are you sure you want to delete this item, this action is irreversable</h3>
                <button className="modal__delete" onClick={()=>{handleDelete()}}>Yes delete item</button>
                <button className="modal__cancel-button" onClick={props.onClose}>Cancel</button>
            </div>
        </div>
    )
}

export {DeleteModal}
