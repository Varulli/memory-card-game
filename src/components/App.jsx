import { useState } from "react";
import Grid from "./Grid";
import "../styles/App.css";

function App() {
  const [numCards, setNumCards] = useState(12);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setNumCards(isNaN(value) || value < 1 ? 1 : value > 30 ? 30 : value);
  };

  return (
    <>
      <div className="info">
        <h1>Memory Game</h1>
        <p>Click consecutive unique cards to increase your score.</p>

        <label>
          Number of Cards:
          <input
            type="number"
            name="number-of-cards"
            id="number-of-cards"
            value={numCards}
            min={1}
            max={30}
            step={1}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
          />
        </label>
      </div>

      <Grid size={numCards} />
    </>
  );
}

export default App;
