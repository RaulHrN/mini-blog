import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="page-container">
      <p className="page-title">Enter</p>
      <p>Log in to be able to use the system</p>
      <form onSubmit={handleSubmit}>
        <label>
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
        {!loading && <button>Enter</button>}
        {!loading && <button disabled>Wait...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
