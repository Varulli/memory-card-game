import { useState, useEffect } from "react";
import Card from "./Card";

const cardData = new Map();

async function getCardData(size) {
  cardData.clear();

  for (let i = 0; i < size; i++) {
    let id;
    do {
      id = Math.floor(Math.random() * 649) + 1;
    } while (cardData.has(id));

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/{id}`);
    const data = await response.json();

    cardData.set(id, {
      name: data.name,
      image:
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      selected: false,
    });
  }
}

function Grid({ size }) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    getCardData(size);
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
      for (const data of cardData) data.selected = false;
      setScore(0);
    } else {
      cardData.get(id).selected = true;
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
