import { useState, useEffect } from "react";

const ellipses = ["", ".", "..", "..."];

function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % ellipses.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div className="loading">Loading{ellipses[index]}</div>;
}

export default Loading;
