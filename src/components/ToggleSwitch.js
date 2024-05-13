import React from "react";

const ToggleSwitch = (props) =>{
    return(
        <div className="header__switch-button">
            <div className="header__switch__text" style={{ whiteSpace: 'pre' }}> F     C</div>
            <div className="header__switch-circle">{props.tempUnit}</div>
          </div>
    )
}

export default ToggleSwitch
