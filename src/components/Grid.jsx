import { useState, useEffect } from "react";
import Card from "./Card";
import Loading from "./Loading";
import "../styles/Grid.css";

const MAX_ID = 649;
const cache = new Map();

async function fetchCardData(size) {
  const cardData = new Map();

  for (let i = 0; i < size; i++) {
    let id;
    do {
      id = Math.floor(Math.random() * MAX_ID) + 1;
    } while (cardData.has(id));

    if (cache.has(id)) cardData.set(id, cache.get(id));
    else {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    fetchCardData(size).then((newCardData) => {
      if (!ignore) {
        setCardData(newCardData);
        setScore(0);
        setHighscore(0);
        setLoading(false);
        // setTimeout(() => setLoading(false), 3000);
      }
    });

    return () => (ignore = true);
  }, [size]);

  function getPermutation() {
    const permutation = [];
    const idBucket = Array.from(cardData.keys());

    while (idBucket.length > 0) {
      const index = Math.floor(Math.random() * idBucket.length);
      const id = idBucket.splice(index, 1)[0];
      const { name, image } = cardData.get(id);
      permutation.push({ id, name, image });
    }

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

  const permutation = getPermutation();

  return (
    <div className="grid">
      <div className="score">
        score: {score}
        <br />
        highscore: {highscore}
      </div>
      {loading ? (
        <Loading />
      ) : (
        permutation.map(({ id, name, image }) => (
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
