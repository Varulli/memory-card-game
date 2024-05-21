import { useState, useEffect } from "react";
import Card from "./Card";
import Loading from "./Loading";

async function fetchCardData(size) {
  const cardData = new Map();

  for (let i = 0; i < size; i++) {
    let id;
    do {
      id = Math.floor(Math.random() * 649) + 1;
    } while (cardData.has(id));

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    cardData.set(id, {
      name: data.name,
      image:
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      selected: false,
    });
  }

  return cardData;
}

function Grid({ size }) {
  const [cardData, setCardData] = useState(new Map());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    fetchCardData(size).then((newCardData) => {
      if (!ignore) {
        setCardData(newCardData);
        setLoading(false);
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
      setCardData((prevCardData) =>
        new Map(prevCardData).forEach((card) => (card.selected = false))
      );
      setScore(0);
    } else {
      setCardData((prevCardData) =>
        new Map(prevCardData).set(id, {
          ...prevCardData.get(id),
          selected: true,
        })
      );
      setScore(score + 1);
      setHighScore(Math.max(score + 1, highScore));
    }
  };

  return (
    <div className="grid">
      {getPermutation().map(({ id, name, image }) => (
        <Card
          key={id}
          image={image}
          description={name}
          handleClick={() => handleClick(id)}
        />
      ))}
    </div>
  );
}

export default Grid;
