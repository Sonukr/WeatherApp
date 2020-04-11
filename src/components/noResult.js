import React from "react";

export const NoResult =  (props) => {
  console.log(props)
return <p className="weather__noResult"><i className="fas fa-frown"></i>{props.message ? props.message : 'Sorry, the specified city was not found.' }</p>;
}


