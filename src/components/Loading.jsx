import { useEffect } from "react";

const ellipses = ["", ".", "..", "..."];
let index = 0;

function Loading() {
  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % ellipses.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div className="loading">Loading{ellipses[index]}</div>;
}

export default Loading;
