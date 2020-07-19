import React, { useEffect, useState, useRef } from "react";
import Menu from "./Menu.js";
import useInterval from "./custom_hooks/useInterval";
import "./GOLv2.scss";
import "css.gg";

const Cell = (props) => {
  const { key, newBorn, alive, row_index, cell_index } = props;
  return (
    <div
      key={`R${row_index}C${cell_index}`}
      id={`R${row_index}C${cell_index}`}
      className={`cell ${newBorn ? "newBorn" : ""} ${
        alive ? "alive" : ""
      }`}></div>
  );
};

const GameOfLifeV2 = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const [cellCount, setCellCount] = useState(null); //default for mobile
  const [gridWidth, setGridWidth] = useState(null);
  const [gridHeight, setGridHeight] = useState(null);
  const [cellGrid, setGrid] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const [delay, setDelay] = useState(100);
  const [generationCount, setGenerationCount] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    handleResize();

    function determineCellCount() {
      if (windowWidth !== null) {
        if (windowWidth >= 1200) {
          setCellCount(1608);
          setGridWidth(67);
          setGridHeight(24);
        }
        if (windowWidth >= 768 && windowWidth < 1200) {
          setCellCount(1100);
          setGridWidth(44);
          setGridHeight(25);
        }
        if (windowWidth < 768) {
          setCellCount(399);
          setGridWidth(19);
          setGridHeight(21);
        }
      }
    }
    determineCellCount();
  }, [windowWidth]);

  useEffect(() => {
    function randomizeGrid() {
      let grid = [];

      if (gridWidth !== null) {
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
      }
    }

    randomizeGrid();
  }, [gridWidth]); //IMPORTANT! This function depends on gridwidth to render properly

  const calculateNeighbors = (currentGrid, ii, jj) => {
    //Rules for Torodial World
    let topRow = ii - 1 < 0 ? gridHeight - 1 : ii - 1;
    let bottomRow = ii + 1 >= gridHeight ? 0 : ii + 1;
    let leftColumn = jj - 1 < 0 ? gridWidth - 1 : jj - 1;
    let rightColumn = jj + 1 >= gridWidth ? 0 : jj + 1;

    let total = 0;

    total += currentGrid[topRow][leftColumn].status ? 1 : 0;
    total += currentGrid[topRow][jj].status ? 1 : 0;
    total += currentGrid[topRow][rightColumn].status ? 1 : 0;
    total += currentGrid[ii][leftColumn].status ? 1 : 0;
    total += currentGrid[ii][rightColumn].status ? 1 : 0;
    total += currentGrid[bottomRow][leftColumn].status ? 1 : 0;
    total += currentGrid[bottomRow][jj].status ? 1 : 0;
    total += currentGrid[bottomRow][rightColumn].status ? 1 : 0;

    return total;
  };

  const updateGrid = () => {
    let previousGridState = cellGrid.slice();
    let currentNeighborTotal = 0;
    let newGrid = [];

    for (let rowIndex = 0; rowIndex < gridHeight; rowIndex++) {
      let newRow = [];
      for (let colIndex = 0; colIndex < gridWidth; colIndex++) {
        currentNeighborTotal = calculateNeighbors(
          previousGridState,
          rowIndex,
          colIndex
        );
        let currentCell = previousGridState[rowIndex][colIndex];

        if (!currentCell.status) {
          if (currentNeighborTotal == 3) {
            newRow.push({ status: true, newBorn: true });
          } else {
            newRow.push({ status: false });
          }
        } else if (currentNeighborTotal < 2) {
          newRow.push({ status: false });
        } else if (currentNeighborTotal > 3) {
          newRow.push({ status: false });
        } else {
          newRow.push({ status: true });
        }
      }
      newGrid.push(newRow);
    }
    setGrid(newGrid);
    setGenerationCount(generationCount + 1);
  };

  useInterval(
    () => {
      updateGrid();
    },
    isRunning ? delay : null
  );

  const checkIfRunning = () => {
    setIsRunning(isRunning);
    return isRunning;
  };

  const togglePlay = () => {
    if (cellGrid.length <= 0) {
      return;
    } else {
      setIsRunning(!isRunning);
    }
  };

  function randomizeGrid() {
    let grid = [];

    if (gridWidth !== null) {
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
    }
  }
  const resetGrid = () => {
    setIsRunning(false);
    setGrid([]);
    randomizeGrid();
    setIsRunning(true);
  };

  return (
    <>
      <div className="gol-container">
        <h3 className="title">Conway's Game Of Life</h3>
        <div className="board">
          {windowWidth
            ? cellGrid.map((tableRow, row_index) => {
                return tableRow.map((tableCell, cell_index) => {
                  return (
                    <Cell
                      row_index={row_index}
                      cell_index={cell_index}
                      alive={tableCell.status}
                      newBorn={tableCell.newBorn}></Cell>
                  );
                });
              })
            : null}
        </div>
        <Menu resetGrid={resetGrid} togglePlay={togglePlay} />
      </div>
    </>
  );
};

export default GameOfLifeV2;
