import React, { useContext } from 'react';
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext"

const ToggleSwitch = (props) =>{
    const { CurrentTemperatureUnit, handleTemperatureUnitChange } = useContext(CurrentTemperatureUnitContext);

    return(
        <div className="header__switch-button">
            <div className="header__switch__text" style={{ whiteSpace: 'pre' }}> F     C</div>
            <div className="header__switch-circle">{CurrentTemperatureUnit}</div>
          </div>
    )
}

export default ToggleSwitch
