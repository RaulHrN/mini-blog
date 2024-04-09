import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export const RegisterPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("Passwords must be the same");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="page-container">
      <p>Register now</p>
      <p>Share your thoughts</p>
      <form onSubmit={handleSubmit}>
        <label>
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
        <label>
          <span>Email:</span>
          <input
            required
            type="email"
            name="email"
            placeholder="User email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            required
            type="password"
            name="password"
            placeholder="insert your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Password confirmation:</span>
          <input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm the password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button>Enter</button>}
        {loading && <button disabled>Wait...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
