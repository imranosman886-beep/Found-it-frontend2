
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signupUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signupUser(email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Could not create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-container auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>Join FoundIt and help reunite people with their belongings.</p>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            minLength={8}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Enter your password again"
            minLength={8}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
