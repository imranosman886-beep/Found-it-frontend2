import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, CalendarDays, ArrowLeft, Package } from "lucide-react";
import { getFoundItem } from "../services/itemService";
import { createClaim } from "../services/claimService";
import { useAuth } from "../context/AuthContext";

function ItemDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [item, setItem] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadItem() {
      setLoading(true);
      setError("");

      try {
        const data = await getFoundItem(id);
        setItem(data);
      } catch (err) {
        setError(err.message || "Could not load this item.");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  async function handleClaim(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!message.trim()) {
      setError("Please explain why this item belongs to you.");
      return;
    }

    setSubmitting(true);

    try {
      await createClaim(item.id, message.trim());
      setSuccess("Your claim has been submitted successfully!");
      setMessage("");
    } catch (err) {
      setError(err.message || "Could not submit your claim.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="loading-message">Loading item details...</p>;
  }

  if (error && !item) {
    return (
      <div className="details-message">
        <p>{error}</p>
        <Link to="/items">Back to Browse Items</Link>
      </div>
    );
  }

  if (!item) return null;

  const available = item.status === "available";

  return (
    <div className="details-page">
      <Link to="/items" className="back-link">
        <ArrowLeft size={18} /> Back to Browse Items
      </Link>

      <div className="details-container">
        <div className="details-image-container">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.item_name}
              className="details-image"
            />
          ) : (
            <div className="details-image-placeholder">
              <Package size={65} />
              <span>No image available</span>
            </div>
          )}
        </div>

        <div className="details-content">
          <span className="details-category">
            {item.category || "Uncategorized"}
          </span>

          <h1>{item.item_name}</h1>

          <span className={`status-label ${available ? "available" : "unavailable"}`}>
            {item.status}
          </span>

          <h3>Description</h3>
          <p className="details-description">{item.description}</p>

          <div className="details-information">
            <p>
              <MapPin size={19} />
              <span>Found at: {item.location}</span>
            </p>

            <p>
              <CalendarDays size={19} />
              <span>Date found: {item.date_found}</span>
            </p>
          </div>

          <div className="claim-section">
            <h2>Is this your item?</h2>
            <p>
              Tell us why you believe this item belongs to you.
              Provide details that can help verify your ownership.
            </p>

            {!user ? (
              <div className="claim-login-message">
                <p>Please log in before submitting a claim.</p>
                <Link to="/login">Log in to continue</Link>
              </div>
            ) : !available ? (
              <p className="details-message">
                This item is no longer available for claims.
              </p>
            ) : (
              <form onSubmit={handleClaim} className="claim-form">
                <label htmlFor="claim-message">Why is this your item?</label>

                <textarea
                  id="claim-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Describe identifying details that prove this item belongs to you..."
                  rows="5"
                  required
                />

                <button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Claim"}
                </button>
              </form>
            )}

            {error && <p className="claim-error">{error}</p>}
            {success && <p className="claim-success">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;