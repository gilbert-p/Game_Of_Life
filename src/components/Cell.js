import React from "react";

const Cell = props => {
  let status = parseInt(props.status);

  return <div className={status > 0 ? "cell" : "cell alive"}></div>;
};

export default Cell;
