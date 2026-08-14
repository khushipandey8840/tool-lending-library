import { useState } from "react";
import "./App.css";

function sanitizeInput(value) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function App() {
  const [request, setRequest] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanRequest = sanitizeInput(request);

    if (!cleanRequest) {
      setError("Please enter a valid request.");
      setResult("");
      return;
    }

    setError("");
    setLoading(true);
    setResult("");

    setTimeout(() => {
      setLoading(false);
      setResult(
        `Code Freeze request received: ${cleanRequest}`
      );

      console.log(
        "[Analytics] User interacted with Code Freeze: AI Injection"
      );
    }, 1000);
  };

  return (
    <main className="app-shell">
      <header className="header">
        <div>
          <p className="eyebrow">TOOL LENDING LIBRARY</p>
          <h1>Code Freeze: AI Injection</h1>
          <p className="subtitle">
            Manage and record code freeze requests in one place.
          </p>
        </div>

        <span className="status-badge" aria-label="System status: Ready">
          Ready
        </span>
      </header>

      <section className="content-card" aria-labelledby="request-heading">
        <div className="section-heading">
          <p className="section-label">PRIMARY ACTION</p>
          <h2 id="request-heading">Create a Code Freeze Request</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="freeze-request">
              Request details
            </label>

            <textarea
              id="freeze-request"
              name="freeze-request"
              value={request}
              onChange={(event) => {
                setRequest(event.target.value);
                if (error) setError("");
              }}
              placeholder="Enter code freeze details..."
              aria-describedby={error ? "request-error" : "request-help"}
              aria-invalid={Boolean(error)}
              rows="6"
            />

            {!error && (
              <p id="request-help" className="helper-text">
                Enter the details required for this code freeze.
              </p>
            )}

            {error && (
              <p
                id="request-error"
                className="error-message"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
            aria-label="Submit code freeze request"
          >
            {loading ? "Processing..." : "Submit Request"}
          </button>
        </form>

        {loading && (
          <div className="loading-state" role="status" aria-live="polite">
            <span className="spinner" aria-hidden="true"></span>
            <span>Processing your request...</span>
          </div>
        )}

        {!loading && !result && (
          <div className="empty-state" aria-live="polite">
            <h3>No data found</h3>
            <p>
              Submit a request to see the processed code freeze data.
            </p>
          </div>
        )}

        {!loading && result && (
          <div className="result-state" role="region" aria-label="Request result">
            <p className="section-label">RESULT</p>
            <h3>Request Processed</h3>
            <p>{result}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;