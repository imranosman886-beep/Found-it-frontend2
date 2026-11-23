
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createFoundItem } from "../services/itemService";
import { getCategories } from "../services/categoryService";
import { useAuth } from "../context/AuthContext";

function ReportFound() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    location: "",
    date_found: "",
    category_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadCategories();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (formData.date_found > maxDate) {
      setError("Found date cannot be in the future.");
      return;
    }

    setLoading(true);

    try {
      const data = await createFoundItem({
        ...formData,
        category_id: Number(formData.category_id),
      });

      navigate(`/items/${data.item.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="page-container">
        <h2>Please log in to report a found item.</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="page-container report-page">
      <div className="report-heading">
        <h1>Report a Found Item</h1>
        <p>Help someone recover something they have lost.</p>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        <label htmlFor="item_name">Item name</label>
        <input
          id="item_name"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          placeholder="e.g. Black Samsung phone"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the item..."
          rows="4"
          required
        />

        <label htmlFor="location">Where did you find it?</label>
        <input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Library, Nairobi"
          required
        />

        <label htmlFor="date_found">Date found</label>
        <input
          id="date_found"
          name="date_found"
          type="date"
          value={formData.date_found}
          onChange={handleChange}
          max={maxDate}
          required
        />

        <label htmlFor="category_id">Category</label>
        <select
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Choose a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Found Item"}
        </button>
      </form>
    </div>
  );
}

export default ReportFound;
