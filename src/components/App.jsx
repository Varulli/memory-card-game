// import { useState } from 'react'
import "../styles/App.css";

function App() {
  return (
    <>
      <div className="info">
        <h1>Memory Card</h1>
        <p>Click consecutive unique cards to increase your score.</p>

        <label htmlFor="number-of-cards">Number of Cards:</label>
        <input
          type="number"
          name="number-of-cards"
          id="number-of-cards"
          value={10}
          min={1}
          max={100}
          step={1}
        />
      </div>

      <div className="card-grid"></div>
    </>
  );
}

export default App;
