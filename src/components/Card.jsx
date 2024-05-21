function Card({ image, description, handleClick }) {
  return (
    <button type="button" className="card" onClick={handleClick}>
      <figure>
        <img src={image} alt={description + " sprite"} />
        <figcaption>{description}</figcaption>
      </figure>
      <caption></caption>
    </button>
  );
}

export default Card;
