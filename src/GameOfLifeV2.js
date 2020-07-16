import React, { useEffect, useState, useRef } from "react";
import Menu from "./Menu.js";

const Cell = (props) => {
  const { key, newBorn, alive } = props;
  return (
    <div
      className={`cell ${newBorn ? "newBorn" : ""} ${alive ? "alive" : ""}`}
      id={key}></div>
  );
};

const GameOfLifeV2 = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [cellCount, setCellCount] = useState(1100); //default for mobile
  const [gridWidth, setGridWidth] = useState(40);
  const [gridHeight, setGridHeight] = useState(25);
  const [cellGrid, setGrid] = useState([]);
  const [generationCount, setGenerationCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [delay, setDelay] = useState(100);

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
        setGridWidth(46);
        setGridHeight(25);
      }
      if (windowWidth >= 1200) {
        setCellCount(1608);
        setGridWidth(67);
        setGridHeight(24);
      }
    }

    determineCellCount();
  }, [windowWidth]);

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
  }, [windowWidth]);

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

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(
    () => {
      updateGrid();
    },
    isRunning ? delay : null
  );

  return (
    <>
      <div className="gol-container">
        <h3 className="title">Conway's Game Of Life</h3>
        <div className="board">
          {cellGrid.map((tableRow, row_index) => {
            return tableRow.map((tableCell, cell_index) => {
              return (
                <Cell
                  key={cell_index}
                  alive={tableCell.status}
                  newBorn={tableCell.newBorn}></Cell>
              );
            });
          })}
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
