
import { useState } from "react";

const items = [
  { name: "Black Backpack", category: "Bags", location: "Library", date: "Nov 15" },
  { name: "Student ID", category: "Documents", location: "Lecture Hall", date: "Nov 16" },
  { name: "Water Bottle", category: "Accessories", location: "Cafeteria", date: "Nov 17" },
  { name: "Headphones", category: "Electronics", location: "Computer Lab", date: "Nov 18" },
];

export default function BrowseItems({ onHome }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", background: "#f4f7fb", minHeight: "100vh" }}>
      <button onClick={onHome}>← Home</button>
      <h1>Browse Found Items</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search item or location..."
        style={{ padding: "12px", width: "min(100%, 350px)", marginBottom: "15px" }}
      />

      <br />

      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "10px" }}>
        <option>All</option>
        <option>Bags</option>
        <option>Documents</option>
        <option>Accessories</option>
        <option>Electronics</option>
      </select>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "25px" }}>
        {filteredItems.map((item, index) => (
          <div key={index} style={{ background: "white", padding: "20px", width: "220px", borderRadius: "10px", boxShadow: "0 2px 8px #ddd" }}>
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Location: {item.location}</p>
            <p>Date: {item.date}</p>
            <button onClick={() => alert("Item claiming will be connected to the backend.")}>
              Claim Item
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && <p>No items found.</p>}
    </div>
  );
}
