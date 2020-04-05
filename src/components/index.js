import React from "react";
import NoResult from "./noResult";
import Result from "./result";

export default class Wether extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Result />
        <NoResult />
      </div>
    );
  }
}
