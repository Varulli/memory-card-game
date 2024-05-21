import { useState, useEffect } from "react";

const cardData = [];

async function getCardData(size) {
  cardData.length = 0;

  for (let i = 0; i < size; i++) {
    let id;
    do {
      id = Math.floor(Math.random() * 649) + 1;
    } while (cardData[id]);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/{id}`);
    const data = await response.json();

    cardData[id] = {
      name: data.name,
      image:
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      selected: false,
    };
  }
}

function Grid({ size }) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    getCardData(size);
  }, [size]);

  const handleClick = (id) => {
    if (cardData[id].selected) {
      for (const data of cardData) data.selected = false;
      setScore(0);
    } else {
      cardData[id].selected = true;
      setScore(score + 1);
      setHighScore(Math.max(score + 1, highScore));
    }
  };

  return <></>;
}

export default Grid;
