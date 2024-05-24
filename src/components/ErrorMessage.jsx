function ErrorMessage({ error }) {
  return (
    <div className="error">
      <h1>Failed to fetch data</h1>
      <p>{"Error: " + error.message}</p>
    </div>
  );
}

export default ErrorMessage;
