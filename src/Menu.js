import React, { useState } from "react";

const Menu = (props) => {
  const { togglePlay, resetGrid } = props;

  const [playToggle, setPlayToggle] = useState(false);

  const changeButton = () => {
    setPlayToggle(!playToggle);
    togglePlay();
  };

  return (
    <div className="game-menu">
      <div onClick={resetGrid} className="menu-btn clear">
        <i class="gg-redo"></i>
        <p>RESET</p>
      </div>
      <div className=" menu-btn togglePlay" onClick={changeButton}>
        {playToggle ? (
          <i class="gg-play-button-o"></i>
        ) : (
          <i class="gg-play-pause-r"></i>
        )}
        {playToggle ? <p>PLAY</p> : <p>PAUSE</p>}
      </div>
    </div>
  );
};

export default Menu;
