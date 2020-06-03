import React from "react";

const Menu = (props) => {
  const { randomizeGrid, clearGrid, togglePlay, updateGrid } = props;

  return (
    <div className="game-menu">
      <div className="menu-btn randomize" onClick={randomizeGrid}>
        Randomize
      </div>
      <div className="menu-btn clear" onClick={clearGrid}>
        Clear
      </div>
      <div className=" menu-btn togglePlay" onClick={togglePlay}>
        Play
      </div>
    </div>
  );
};

export default Menu;
