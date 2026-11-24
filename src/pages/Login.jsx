
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/";

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const isAdmin = accountType === "admin";

      await loginUser(identifier, password, isAdmin);

      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-container auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Log in to your FoundIt account.</p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="accountType">Account Type</label>
          <select
            id="accountType"
            value={accountType}
            onChange={(event) => setAccountType(event.target.value)}
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>

          <label htmlFor="identifier">
            {accountType === "admin"
              ? "Admin Email Address"
              : "Institutional ID"}
          </label>

          <input
            id="identifier"
            type={accountType === "admin" ? "email" : "text"}
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder={
              accountType === "admin"
                ? "Enter your admin email"
                : "Enter your institutional ID"
            }
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link
            to="/signup"
            state={{ from: location.state?.from }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
