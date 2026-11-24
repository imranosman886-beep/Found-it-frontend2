
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createLostItem,
  uploadImage,
} from "../services/itemService";
import { getCategories } from "../services/categoryService";
import { useAuth } from "../context/AuthContext";

function ReportLost() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    location: "",
    date_lost: "",
    category_id: "",
  });

  const [image, setImage] = useState(null);
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

  function handleImageChange(event) {
    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      setImage(null);
      return;
    }

    setImage(selectedImage);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (formData.date_lost > maxDate) {
      setError("Lost date cannot be in the future.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        const uploadData = await uploadImage(image);
        imageUrl = uploadData.image_url;
      }

      const data = await createLostItem({
        ...formData,
        category_id: Number(formData.category_id),
        image_url: imageUrl,
      });

      navigate(`/items/${data.item.id}?type=lost`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="page-container">
        <h2>Please log in to report a lost item.</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="page-container report-page">
      <div className="report-heading">
        <h1>Report a Lost Item</h1>
        <p>Tell us about the item you lost so someone can help you find it.</p>
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
          placeholder="Describe the item and any identifying details..."
          rows="4"
          required
        />

        <label htmlFor="location">Where did you lose it?</label>
        <input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Main library, Nairobi"
          required
        />

        <label htmlFor="date_lost">Date lost</label>
        <input
          id="date_lost"
          name="date_lost"
          type="date"
          value={formData.date_lost}
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

        <label htmlFor="item_image">Item image (optional)</label>
        <input
          id="item_image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
        />

        {image && <p>Selected image: {image.name}</p>}

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Lost Item"}
        </button>
      </form>
    </div>
  );
}

export default ReportLost;
