import React, { useState, useEffect } from "react";

export const GOLContext = React.createContext();

export const GameOfLifeProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <GOLContext.Provider value={{ isRunning }}>{children}</GOLContext.Provider>
  );
};
