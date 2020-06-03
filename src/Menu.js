import React from "react";

const Menu = (props) => {
  const { randomizeGrid, clearGrid, togglePlay, updateGrid } = props;

  return (
    <div className="game-menu">
      <div className="menu-btn randomize" onClick={randomizeGrid}>
        <i class="gg-arrows-exchange"></i>
        <p>Randomize</p>
      </div>
      <div className="menu-btn clear" onClick={clearGrid}>
        <i class="gg-redo"></i>
        <p>Clear</p>
      </div>
      <div className=" menu-btn togglePlay" onClick={togglePlay}>
        <i class="gg-play-button-o"></i>
        <p>Play</p>
      </div>
    </div>
  );
};

export default Menu;
