import React from "react";
import NoResult from "./noResult";
import Result from "./result";
import image from "./bgc.jpg";

export default class Wether extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <image src={image} />
        <Result />
        <NoResult />
      </div>
    );
  }
}
