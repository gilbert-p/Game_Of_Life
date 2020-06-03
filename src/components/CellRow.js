import React from "react";
import Cell from "./Cell";

const CellRow = props => {
  console.log(props.curr_row);

  return (
    <>
      {/* maps through each indiviual index on the row */}
      {props.curr_row.map(cell_status => {
        return <Cell status={cell_status} />;
      })}
    </>
  );
};

export default CellRow;
