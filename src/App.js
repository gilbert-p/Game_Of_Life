import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <div id="main-container" className=" d-flex flex-wrap">
        <Grid GRID_ROWS="40" GRID_COLUMNS="40" />
        <Menu />
      </div>
    </>
  );
}

export default App;
