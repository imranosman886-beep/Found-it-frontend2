export default function Home({ onBrowse, onLogin, onSignup }) {
  return (
    <div style={{ fontFamily: "Arial", background: "#f4f7fb", minHeight: "100vh" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px 8%", background: "#17324d", color: "white" }}>
        <h2>FoundIt</h2>
        <div>
          <button onClick={onBrowse}>Browse Items</button>{" "}
          <button onClick={onLogin}>Login</button>{" "}
          <button onClick={onSignup}>Sign Up</button>
        </div>
      </nav>

      <section style={{ textAlign: "center", padding: "100px 20px" }}>
        <h1 style={{ fontSize: "48px", color: "#17324d" }}>
          Lost something? Find it here.
        </h1>
        <p>Helping students reunite with their lost belongings on campus.</p>

        <button
          onClick={onBrowse}
          style={{
            background: "#1683d8",
            color: "white",
            padding: "14px 28px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Browse Found Items
        </button>
      </section>

      <section style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", padding: "20px" }}>
        {["Report Lost Items", "Report Found Items", "Claim Your Item"].map((item) => (
          <div key={item} style={{ background: "white", padding: "25px", borderRadius: "10px", width: "250px" }}>
            <h3>{item}</h3>
            <p>Use FoundIt to help reunite items with their owners.</p>
            <button onClick={onBrowse}>Get Started</button>
          </div>
        ))}
      </section>
    </div>
  );
}
