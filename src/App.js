import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { motion } from "framer-motion";
import { Frame, Scroll, useCycle } from "framer";
import GameOfLife from "./GameOfLife";

function App() {
  return (
    <>
      <GameOfLife></GameOfLife>
    </>
  );
}

export default App;
