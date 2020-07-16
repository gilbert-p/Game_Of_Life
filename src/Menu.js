import React, { useState } from "react";

const Menu = (props) => {
  // const { randomizeGrid, clearGrid, togglePlay, checkIfRunning } = props;

  const [playToggle, setPlayToggle] = useState(false);
  // const changeButton = () => {
  //   setPlayToggle(!playToggle);
  //   togglePlay();
  // };

  return (
    <div className="game-menu">
      <div className="menu-btn randomize">
        <i class="gg-arrows-exchange"></i>
        <p>Randomize</p>
      </div>
      <div className="menu-btn clear">
        <i class="gg-redo"></i>
        <p>Clear</p>
      </div>
      <div className=" menu-btn togglePlay">
        {/* {playToggle ? (
          <i class="gg-play-pause-r"></i>
        ) : (
          <i class="gg-play-button-o"></i>
        )} */}
      </div>
    </div>
  );
};

export default Menu;
