import React from 'react';
import './App.css';
import Game from "./containers/Game/Game";
import DifficultContextProvider from "./context/DifficultContext";

function App() {
  return (
    <div className="App">
        <DifficultContextProvider>
            <Game />
        </DifficultContextProvider>
    </div>
  );
}

export default App;

// problem with red color of block
// button restart
// timer
// db
