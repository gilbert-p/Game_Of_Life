import React, { useEffect, useState } from "react";
import Menu from "./Menu.js";

const Cell = (props) => {
  const { alive, newBorn } = props;
  return (
    <div
      className={`${newBorn ? "newBorn" : ""} ${alive ? "alive" : ""}`}></div>
  );
};

const GameOfLifeV2 = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [cellCount, setCellCount] = useState(399); //default for mobile
  const [gridWidth, setGridWidth] = useState(40);
  const [gridHeight, setGridHeight] = useState(25);
  const [cellGrid, setGrid] = useState([]);
  const [generationCount, setGenerationCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(100);

  const initializeGrid = () => {
    let grid = [];

    for (let rowIndex = 0; rowIndex < gridHeight; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < gridWidth; colIndex++) {
        let value = false;
        row.push({
          status: value,
        });
      }
      grid.push(row);
    }
    setGrid(grid);
  };

  useEffect(() => {
    function randomizeGrid() {
      let grid = [];

      for (let rowIndex = 0; rowIndex < gridHeight; rowIndex++) {
        let row = [];
        for (let colIndex = 0; colIndex < gridWidth; colIndex++) {
          let cellState = Math.random() > 0.8 ? true : false;
          if (!cellState) {
            row.push({
              status: cellState,
            });
          } else {
            row.push({
              status: cellState,
              newBorn: true,
            });
          }
        }
        grid.push(row);
      }
      setGrid(grid);
      console.log(grid);
    }

    randomizeGrid();
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    handleResize();
  });

  useEffect(() => {
    function determineCellCount() {
      if (windowWidth < 768) {
        setCellCount(399);
        setGridWidth(19);
        setGridHeight(21);
      }
      if (windowWidth >= 768) {
        setCellCount(1100);
        setGridWidth(44);
        setGridHeight(25);
      }
      if (windowWidth >= 1200) {
        setCellCount(1608);
        setGridWidth(67);
        setGridHeight(24);
      }
    }
    determineCellCount();
    createCells();
  });
  const createCells = () => {
    let cellArray = [];

    for (let cells = 0; cells < cellCount; cells++) {
      cellArray.push(<div id={cells + 1} className="cell"></div>);
    }
    return cellArray;
  };

  return (
    <>
      <div className="gol-container">
        <h3 className="title">Conway's Game Of Life</h3>
        <div className="board">
          {/* {createCells().map((index) => {
            return (
              <Cell
                key={index}
                flipState={() => {
                  flipState(cell_index, row_index);
                }}
                alive={tableCell.status}
                newBorn={tableCell.newBorn}></Cell>
            );
          })} */}
        </div>
        <Menu
        // randomizeGrid={randomizeGrid}
        // clearGrid={clearGrid}
        // togglePlay={togglePlay}
        // updateGrid={updateGrid}
        // checkIfRunning={checkIfRunning}
        />
      </div>
      <h3>{`CellCount: ${cellCount}`}</h3>
      <h3>{`Height: ${windowHeight}`}</h3>
      <h3>{`Width: ${windowWidth}`}</h3>
    </>
  );
};

export default GameOfLifeV2;
