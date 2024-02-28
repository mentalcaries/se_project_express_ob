import React from "react";

const Footer = (props) => {
  return (
    <ul className="footer">
      <li>
        <h3>{props.developerName}</h3>
      </li>
      <li>
        <h3>{props.year}</h3>
      </li>
    </ul>
  );
};

export { Footer };

