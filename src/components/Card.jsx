function Card({ image, description, handleClick }) {
  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={description + " card"} />
    </div>
  );
}

export default Card;
