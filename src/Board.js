import React, { useState, useEffect, useRef } from "react";
import Menu from "./Menu";

const Cell = (props) => {
  const { alive, flipState, newBorn } = props;
  return (
    <td
      className={`${newBorn ? "newBorn" : ""} ${alive ? "alive" : ""}`}
      onClick={flipState}></td>
  );
};

const Board = () => {
  const [gridWidth, setGridWidth] = useState(40);
  const [gridHeight, setGridHeight] = useState(25);
  const [cellGrid, setGrid] = useState([]);
  const [generationCount, setGenerationCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
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
    randomizeGrid();
  }, []);

  const randomizeGrid = () => {
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
  };

  const clearGrid = () => {
    setIsRunning(false);

    let grid = [];

    for (let rowIndex = 0; rowIndex < gridHeight; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < gridWidth; colIndex++) {
        row.push({
          status: false,
        });
      }
      grid.push(row);
    }
    setGrid(grid);
  };

  const flipState = (x, y) => {
    let updatedGrid = cellGrid.slice();
    let currentCell = updatedGrid[y][x];
    if (!currentCell.status) {
      currentCell.newBorn = true;
    }
    currentCell.status = !currentCell.status;
    setGrid(updatedGrid);
  };

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

  const togglePlay = () => {
    if (cellGrid.length <= 0) {
      return;
    } else {
      setIsRunning(!isRunning);
    }
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

  const checkIfRunning = () => {
    setIsRunning(isRunning);
    return isRunning;
  };

  useInterval(
    () => {
      updateGrid();
    },
    isRunning ? delay : null
  );

  return (
    <>
      <div className="game-grid">
        <table id="grid-table">
          <tbody>
            {cellGrid.map((tableRow, row_index) => {
              return (
                <tr key={row_index}>
                  {tableRow.map((tableCell, cell_index) => {
                    return (
                      <Cell
                        key={cell_index}
                        flipState={() => {
                          flipState(cell_index, row_index);
                        }}
                        alive={tableCell.status}
                        newBorn={tableCell.newBorn}></Cell>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Menu
        randomizeGrid={randomizeGrid}
        clearGrid={clearGrid}
        togglePlay={togglePlay}
        updateGrid={updateGrid}
        checkIfRunning={checkIfRunning}
      />
    </>
  );
};

export default Board;
