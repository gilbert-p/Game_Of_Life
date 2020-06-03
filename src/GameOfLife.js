import React from "react";
import Board from "./Board";
import { GameOfLifeProvider } from "./GameOfLifeProvider";

const GameOfLife = () => {
  const playState = (e) => {
    e.preventDefault();
  };

  return (
    <div className="game-container">
      <h1 className="gol-title">Conway's Game of Life (React JS)</h1>
      <Board></Board>
    </div>
  );
};

export default GameOfLife;
