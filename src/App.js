import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Board from './board/Board'
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        DI Trello
      </header>
      <Board></Board>
    </div>
  );
}

export default App;
