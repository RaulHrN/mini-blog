import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="page-container">
      <p className="page-title">Log in</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="form-label">
          <p>Email:</p>
          <input
            required
            type="email"
            name="email"
            placeholder="User email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Enter</button>}
        {loading && <button className="btn" disabled>Wait...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
