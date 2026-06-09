export default function Loading({ fullPage = false }) {
  if (fullPage) {
    return (
      <div className="loading-fullpage">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <div className="spinner-small"></div>
      <p>Loading...</p>
    </div>
  );
}
