import "../styles/ErrorMessage.css";

function ErrorMessage({ error }) {
  return (
    <div className="error">
      <h2>Failed to fetch data</h2>
      <p>{"Error: " + error.message}</p>
    </div>
  );
}

export default ErrorMessage;
