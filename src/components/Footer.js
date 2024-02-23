import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="footer">
        <li>
            <h3>{this.props.developerName}</h3>
        </li>
        <li>
            <h3>{this.props.year}</h3>
        </li>
      </ul>
    );
  }
}

export { Footer };
