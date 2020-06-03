import React, { Component } from "react";
import CellRow from "./CellRow";

class Grid extends Component {
  constructor(props) {
    super(props);
    let num;
    let rows = parseInt(props.GRID_ROWS);
    let cols = parseInt(props.GRID_COLUMNS);

    let row_list = [];
    let col_list = [];

    let list = [];
    for (let rr = 0; rr < rows; rr++) {
      row_list.push(col_list);
      col_list = [];

      for (let cc = 0; cc < cols; cc++) {
        num = Math.floor(Math.random() * 10);
        num > 2 ? col_list.push(1) : col_list.push(0);
      }
    }

    this.state = {
      cell_list: row_list
    };
  }

  render() {
    console.log(this.state.cell_list);

    return (
      <>
        <div id="cell-container" className="d-flex">
          {/* Maps through each row */}
          {this.state.cell_list.map(row => {
            return <CellRow curr_row={row} />;
          })}
        </div>
      </>
    );
  }
}

export default Grid;
