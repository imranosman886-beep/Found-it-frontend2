import { useState } from "react";

export default function Signup({ onLogin, onHome }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    alert("Registration submitted. Backend connection will be added.");
  }

  return (
    <div style={{ background: "#f4f7fb", minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "Arial" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "35px", width: "min(90%, 380px)", borderRadius: "12px", boxShadow: "0 4px 15px #ddd" }}>
        <button type="button" onClick={onHome}>← Home</button>
        <h1>Create Account</h1>
        <p>Join the FoundIt campus community.</p>

        <label>Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your full name"
          style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0 20px", boxSizing: "border-box" }}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your student email"
          style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0 20px", boxSizing: "border-box" }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
          placeholder="Create a password"
          style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0 20px", boxSizing: "border-box" }}
        />

        <button type="submit" style={{ width: "100%", padding: "12px", background: "#1683d8", color: "white", border: "none", borderRadius: "6px" }}>
          Sign Up
        </button>

        <p>Already registered? <button type="button" onClick={onLogin}>Login</button></p>
      </form>
    </div>
  );
}