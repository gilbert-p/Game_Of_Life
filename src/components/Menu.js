import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <>
        <div id="menu" className="d-flex mt-3">
          <div id="randomize" className="d-flex flex-row px-4">
            <i class="gg-controller"></i>
            <h5 class="button-text">Randomize</h5>
          </div>
        </div>
      </>
    );
  }
}

export default Menu;
