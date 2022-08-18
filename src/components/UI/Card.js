import React from "react";

const Card = (props) => {
  return (
    <div className={`${props.className} rounded-md shadow-md`}>
      {props.children}
    </div>
  );
};

export default Card;