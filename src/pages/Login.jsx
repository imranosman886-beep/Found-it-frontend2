import { useState } from "react";

export default function Login({ onSignup, onHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    alert("Login form submitted. Backend connection will be added.");
  }

  return (
    <div style={{ background: "#f4f7fb", minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "Arial" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "35px", width: "min(90%, 380px)", borderRadius: "12px", boxShadow: "0 4px 15px #ddd" }}>
        <button type="button" onClick={onHome}>← Home</button>
        <h1>Login</h1>
        <p>Welcome back to FoundIt</p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0 20px", boxSizing: "border-box" }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0 20px", boxSizing: "border-box" }}
        />

        <button type="submit" style={{ width: "100%", padding: "12px", background: "#1683d8", color: "white", border: "none", borderRadius: "6px" }}>
          Login
        </button>

        <p>Don't have an account? <button type="button" onClick={onSignup}>Sign up</button></p>
      </form>
    </div>
  );
}