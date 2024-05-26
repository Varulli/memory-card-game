import { useState, useEffect } from "react";
import Card from "./Card";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import "../styles/Grid.css";

const MAX_ID = 649;
const cache = new Map();

async function fetchCardData(size, signal) {
  const cardData = new Map();

  for (let i = 0; i < size; i++) {
    let id;
    do {
      id = Math.floor(Math.random() * MAX_ID) + 1;
    } while (cardData.has(id));

    if (cache.has(id)) cardData.set(id, cache.get(id));
    else {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        mode: "cors",
        signal,
      });
      if (signal.aborted) return;
      if (!response.ok)
        throw new Error(`HTTP error. status: ${response.status}`);

      const data = await response.json();
      const dataObj = {
        name: data.name,
        image:
          data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
        selected: false,
      };

      cardData.set(id, dataObj);
      cache.set(id, dataObj);
    }
  }

  return cardData;
}

function Grid({ size }) {
  const [cardData, setCardData] = useState(new Map());
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setLoading(true);

    (async () => {
      try {
        const newCardData = await fetchCardData(size, signal);

        if (newCardData) {
          setCardData(newCardData);
          setScore(0);
          setHighscore(0);
          setError(null);
          setLoading(false);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error(error);
          setError(error);
        }
      }
    })();

    return () => abortController.abort();
  }, [size]);

  function getPermutation() {
    const permutation = Array.from(cardData.keys()).map((id) => {
      return {
        id,
        ...cardData.get(id),
      };
    });

    permutation.sort(() => Math.random() - 0.5);

    return permutation;
  }

  const handleClick = (id) => {
    if (cardData.get(id).selected) {
      setCardData((prevCardData) => {
        const newCardData = new Map(prevCardData);
        newCardData.forEach((card) => (card.selected = false));
        return newCardData;
      });
      setScore(0);
    } else {
      setCardData((prevCardData) =>
        new Map(prevCardData).set(id, {
          ...prevCardData.get(id),
          selected: true,
        })
      );
      setScore(score + 1);
      setHighscore(Math.max(score + 1, highscore));
    }
  };

  return (
    <div className="grid">
      <div className="score">
        score: {score}
        <br />
        highscore: {highscore}
      </div>
      {error ? (
        <ErrorMessage error={error} />
      ) : loading ? (
        <Loading />
      ) : (
        getPermutation().map(({ id, name, image }) => (
          <Card
            key={id}
            image={image}
            description={name}
            handleClick={() => handleClick(id)}
          />
        ))
      )}
    </div>
  );
}

export default Grid;
