import "./RegisterPage.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export const RegisterPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords must be the same");
      return;
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="page-container">
      <p className="page-title">Register now</p>
      <form className="form-container register-form" onSubmit={handleSubmit}>
        <label className="form-label">
          <p>Name:</p>
          <input
            required
            type="text"
            name="displayName"
            placeholder="User name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
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
        <label className="form-label">
          <p>Password:</p>
          <input
            required
            type="password"
            name="password"
            placeholder="insert your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="form-label">
          <p>Password confirmation:</p>
          <input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm the password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Register</button>}
        {loading && <button  className="btn" disabled>Wait...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
