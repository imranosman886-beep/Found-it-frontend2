
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signupUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || { pathname: "/" };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [institutionalId, setInstitutionalId] = useState("");
  const [universityCode, setUniversityCode] = useState("MOR");
  const [accountType, setAccountType] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (new TextEncoder().encode(password).length > 72) {
      setError("Password must not exceed 72 bytes.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await signupUser({
        full_name: fullName,
        email,
        institutional_id: institutionalId,
        university_code: universityCode,
        account_type: accountType,
        password,
      });

      // Go directly to the page the user originally wanted.
      navigate(
        `${redirectTo.pathname || "/"}${redirectTo.search || ""}${redirectTo.hash || ""}`,
        { replace: true }
      );
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
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Institutional Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your university email"
            required
          />

          <label htmlFor="institutionalId">Institutional ID</label>
          <input
            id="institutionalId"
            type="text"
            value={institutionalId}
            onChange={(event) => setInstitutionalId(event.target.value)}
            placeholder="Example: MOR-STU-001"
            required
          />

          <label htmlFor="universityCode">University</label>
          <select
            id="universityCode"
            value={universityCode}
            onChange={(event) => setUniversityCode(event.target.value)}
            required
          >
            <option value="MOR">Moringa School</option>
          </select>

          <label htmlFor="accountType">Account Type</label>
          <select
            id="accountType"
            value={accountType}
            onChange={(event) => setAccountType(event.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>

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

          <p className="password-requirements">
            Password must contain:
          </p>

          <ul className="password-requirements">
            <li>At least 8 characters</li>
            <li>One uppercase letter (A-Z)</li>
            <li>One lowercase letter (a-z)</li>
            <li>One number (0-9)</li>
          </ul>

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
