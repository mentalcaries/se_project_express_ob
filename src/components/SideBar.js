import React from "react";
import profileLogo from "../images/terrence.svg";

const returnImage = (link, alt, id = "", className = "") => {
    return <img src={link} alt={alt} id={id} className={className} />;
};

const SideBar = () => {
    return (
        <div className='profile__avatar'>
            <h3 className='profile__avatar-text'>Terrence Tegegne </h3>
            {returnImage(profileLogo, "Profile Logo", "", "profile__logo")}
        </div>
    )
}

export default SideBar
