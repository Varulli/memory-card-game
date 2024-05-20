import { useState } from "react";
import "../styles/App.css";

function App() {
  const [numCards, setNumCards] = useState(10);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setNumCards(isNaN(value) || value < 1 ? 1 : value > 100 ? 100 : value);
  };

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
          value={numCards}
          min={1}
          max={100}
          step={1}
          onChange={handleInputChange}
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
        />
      </div>

      <div className="card-grid"></div>
    </>
  );
}

export default App;
