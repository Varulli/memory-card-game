import "../styles/Card.css";

function Card({ image, description, handleClick }) {
  return (
    <button type="button" className="card" onClick={handleClick}>
      <figure>
        <img src={image} alt={description + " sprite"} />
        <figcaption>{description}</figcaption>
      </figure>
    </button>
  );
}

export default Card;
